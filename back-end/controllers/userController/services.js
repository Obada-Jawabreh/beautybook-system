const prisma = require("../../config/DBprisma");
const { calculateAvailableSlots } = require("../../helpers/helpers");

const getStaffDetails = async (req, res) => {
  const { staffId } = req.params;

  try {
    const [staff, appointments, bookings] = await Promise.all([
      prisma.staff.findUnique({
        where: {
          id: Number(staffId),
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          admin_id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          services: true, // Ensure that only services and other necessary fields are included
        },
      }),
      prisma.appointment.findMany({
        where: {
          staff_id: Number(staffId),
        },
        orderBy: {
          schedule_date: "asc",
        },
      }),
      prisma.booking.findMany({
        where: {
          staff_id: Number(staffId),
        },
        select: {
          appointmentId: true,
          booking_start_time: true,
        },
      }),
    ]);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const availableSlots = calculateAvailableSlots(appointments, bookings);

    res.json({
      staff,
      availableSlots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getStaffDetails,
};
