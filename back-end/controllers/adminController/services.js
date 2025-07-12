const prisma = require("../../config/DBprisma");
const addService = async (req, res) => {
  try {
    const { name, price, description, staff_id } = req.body;

    const admin_id = req.user.id;
    const staffUser = await prisma.staff.findFirst({
      where: {
        id: Number(staff_id),
      },
    });
    if (!staffUser) {
      return res.status(400).json({ message: "Invalid staff member." });
    }
    const newService = await prisma.service.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        staff_id: Number(staff_id),
        admin_id: Number(admin_id),
      },
    });

    res.status(201).json({
      message: "Service created successfully",
      service: newService,
    });
  } catch (error) {
    console.error("Add Service Error:", error);
    res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};
// -----------------------------------

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, staff_id } = req.body;

    const admin_id = req.user.id;
    const staffUser = await prisma.staff.findFirst({
      where: {
        id: Number(staff_id),
      },
    });
    if (!staffUser) {
      return res.status(400).json({ message: "Invalid staff member." });
    }
    const updatedService = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        name,
        price: parseFloat(price),
        description,
        staff_id: Number(staff_id),
        admin_id: Number(admin_id),
      },
    });

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};
// -----------------------------------
const getServicesAndStaff = async (req, res) => {
  try {
    const [services, staff] = await Promise.all([
      prisma.service.findMany({
        where: { admin_id: req.user.id },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          staff: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
            },
          },
          admin: {
            select: {
              id: true,
              first_name: true,
            },
          },
        },
      }),
      prisma.staff.findMany({
        where: { admin_id: req.user.id, status: "approved" },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      }),
    ]);

    res.status(200).json({ services, staff });
  } catch (error) {
    console.error("Get Services & Staff Error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
};

// -----------------------------------

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({
      message: "Failed to delete service",
      error: error.message,
    });
  }
};
// -----------------------------------

module.exports = {
  addService,
  updateService,
  deleteService,
  getServicesAndStaff,
};
