// controllers/adminController/staff.js

const prisma = require("../../config/DBprisma");
const getAllStaff = async (req, res) => {
  try {
    const staffList = await prisma.staff.findMany({
      where: {
        admin_id: req.user.id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        status: true,
      },
    });

    res.status(200).json({ staff: staffList });
  } catch (error) {
    console.error("Get All Staff Error:", error);
    res.status(500).json({
      message: "Failed to fetch staff",
      error: error.message,
    });
  }
};

const updateStaffStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }


    const updatedStaff = await prisma.staff.update({
      where: { id: Number(id), admin_id: req.user.id },
      data: { status },
    });


    res.status(200).json({
      message: "Staff status updated successfully",
      staff: updatedStaff,
    });
  } catch (error) {
    console.error("Update Staff Status Error:", error);

    console.error("Error Stack:", error.stack);

    res.status(500).json({
      message: "Failed to update staff status",
      error: error.message,
    });
  }
};


module.exports = { getAllStaff, updateStaffStatus };
