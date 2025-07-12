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
const getMyClients = async (req, res) => {
  try {
    const staffId = req.user.id;

    const bookings = await prisma.booking.findMany({
      where: {
        staff_id: staffId,
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const clients = bookings.map((booking) => ({
      bookingId: booking.id,
      bookingStatus: booking.status,
      bookingStartTime: booking.booking_start_time,
      clientId: booking.user.id,
      clientFirstName: booking.user.first_name,
      clientLastName: booking.user.last_name,
      clientEmail: booking.user.email,
      serviceId: booking.service.id,
      serviceName: booking.service.name,
      servicePrice: booking.service.price,
    }));

    return res.json({ clients });
  } catch (error) {
    console.error("Error fetching my clients:", error);
    return res.status(500).json({ message: "Failed to fetch clients" });
  }
};
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!["confirmed", "pending", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: Number(bookingId),
      },
      data: {
        status,
      },
    });

    return res.json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({ message: "Failed to update booking status" });
  }
};
module.exports = {
  getMyServices,
  getMyClients,
  updateBookingStatus,
};
