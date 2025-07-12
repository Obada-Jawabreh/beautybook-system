const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = require("../../config/DBprisma");
const {
  checkEmailExists,
  createUserByRole,
  generateToken,
} = require("../../utils/utils");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const staff = await prisma.staff.findUnique({
        where: { email },
      });

      if (!staff) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, staff.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(staff.id, "staff");
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: staff.id,
          first_name: staff.first_name,
          last_name: staff.last_name,
          email: staff.email,
          role: "staff",
          status: staff.status,
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.role);
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
  }
};


// -------------------------
const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role, admin_id } = req.body;

    if (!first_name || !last_name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (role === "staff") {
      if (!admin_id) {
        return res
          .status(400)
          .json({ message: "Admin ID is required for staff" });
      }

      const adminExists = await prisma.user.findUnique({
        where: { id: admin_id, role: "admin" },
        select: { id: true },
      });

      if (!adminExists) {
        return res.status(400).json({ message: "Admin not found" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userData = {
      first_name,
      last_name,
      email,
      hashedPassword,
    };

    if (role === "staff") {
      userData.admin_id = admin_id;
    }

    const result = await createUserByRole(role, userData);

    const token = generateToken(result.id, result.role);

    return res.status(201).json({
      message: `${role === "staff" ? "Staff" : ""} Registration successful`,
      token,
      user: {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        role: `${role === "staff" ? "staff" : result.role} `,
        ...(role === "staff" && { status: result.status }),
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      message: "Server error",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
  }
};

// -------------------------

const getAdmins = async (req, res) => {
  try {
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    return res.status(200).json({
      message: "Admins fetched successfully",
      admins,
    });
  } catch (error) {
    console.error("Get Admins error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
module.exports = { login, register, getAdmins };
