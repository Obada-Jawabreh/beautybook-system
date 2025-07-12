const prisma = require("../../config/DBprisma");

const createBooking = async (req, res) => {
  console.log(req.body);

  try {
    const { appointmentId, serviceId, booking_start_time, staff_id } = req.body;

    if (!appointmentId || !serviceId || !booking_start_time || !staff_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = await prisma.booking.create({
      data: {
        appointmentId: Number(appointmentId),
        serviceId: Number(serviceId),
        booking_start_time: booking_start_time,
        staff_id: Number(staff_id),
        clientId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        clientId: req.user.id,
      },
      include: {
        service: true,
        staff: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (bookings.length > 0) {
      const formattedBookings = bookings.map((booking) => ({
        id: booking.id,
        clientId: booking.clientId,
        staff_id: booking.staff_id,
        appointmentId: booking.appointmentId,
        booking_start_time: booking.booking_start_time,
        serviceId: booking.serviceId,
        status_service: booking.status,
        name_service: booking.service.name,
        price: booking.service.price,
        description: booking.service.description,
        staff_first_name: booking.staff.first_name,
        staff_last_name: booking.staff.last_name,
        staff_email: booking.staff.email,
      }));

      return res.status(200).json({
        message: "Bookings retrieved successfully",
        bookings: formattedBookings,
      });
    } else {
      return res.status(404).json({
        message: "No bookings found",
      });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
};
