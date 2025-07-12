const prisma = require("../config/DBprisma");
const jwt = require("jsonwebtoken");

const checkEmailExists = async (email) => {
  const [userCount, staffCount] = await Promise.all([
    prisma.user.count({ where: { email } }),
    prisma.staff.count({ where: { email } }),
  ]);
  return userCount > 0 || staffCount > 0;
};

const createUserByRole = async (role, userData) => {
  const { first_name, last_name, email, hashedPassword, admin_id } = userData;

  if (role === "staff") {
    return await prisma.staff.create({
      data: {
        first_name,
        last_name,
        email,
        admin_id,
        status: "pending",
        password: hashedPassword,
      },
    });
  } else {
    return await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role,
      },
    });
  }
};

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "60d" });
};

module.exports = { checkEmailExists, createUserByRole, generateToken };
