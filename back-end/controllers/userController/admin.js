const prisma = require("../../config/DBprisma");

const getAllAdmins = async (req, res) => {
  try {
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        _count: {
          select: {
            staff: true,
          },
        },
      },
    });

    const formattedAdmins = admins.map((admin) => ({
      id: admin.id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email,
      staff_count: admin._count.staff,
    }));

    res.status(200).json({ admins: formattedAdmins });
  } catch (error) {
    console.error("Get all admins error:", error);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};
// -------------------------------
const getCenterData = async (req, res) => {
  const { centerId } = req.params;

  try {
    const center = await prisma.user.findUnique({
      where: { id: Number(centerId), role: "admin" },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        staff: {
          where: {
            status: "approved",
          },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            createdAt: true,
            services: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }

    const formattedStaff = center.staff.map((staff) => ({
      id: staff.id,
      first_name: staff.first_name,
      last_name: staff.last_name,
      email: staff.email,
      createdAt: staff.createdAt,
      avatar: staff.first_name.charAt(0) + staff.last_name.charAt(0),
      specialties: staff.services.map((service) => service.name),
    }));

    res.status(200).json({
      name: `${center.first_name} ${center.last_name}`,
      email: center.email,
      staff: formattedStaff,
    });
  } catch (error) {
    console.error("Get center data error:", error);
    res.status(500).json({ message: "Failed to fetch center data" });
  }
};

module.exports = {
  getAllAdmins,
  getCenterData,
};
