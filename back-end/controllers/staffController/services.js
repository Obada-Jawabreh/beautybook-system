// controllers/staffController.js
const prisma = require("../../config/DBprisma");

const getMyServices = async (req, res) => {
  try {
    const staffId = req.user.id;

    const services = await prisma.service.findMany({
      where: {
        staff_id: staffId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        staff: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    const formattedServices = services.map((s) => ({
      id: s.id,
      name: s.name,
      price: s.price,
      description: s.description,
      staff: `${s.staff.first_name} ${s.staff.last_name}`,
    }));

    return res.json({ services: formattedServices });
  } catch (error) {
    console.error("Error fetching my services:", error);
    return res.status(500).json({ message: "Failed to fetch services" });
  }
};
module.exports = {
  getMyServices,
};
