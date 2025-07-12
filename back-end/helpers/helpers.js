const calculateAvailableSlots = (appointments, bookings) => {
  const availableSlots = [];

  const bookingMap = new Map();
  bookings.forEach((booking) => {
    const key = `${booking.appointmentId}-${booking.booking_start_time}`;
    bookingMap.set(key, true);
  });

  for (const appointment of appointments) {
    const slots = [];

    const startHour = parseInt(appointment.start_time.split(":")[0]);
    const endHour = parseInt(appointment.end_time.split(":")[0]);

    for (let hour = startHour; hour < endHour; hour++) {
      const slotTime = `${hour.toString().padStart(2, "0")}:00`;
      const bookingKey = `${appointment.id}-${slotTime}`;

      slots.push({
        time: slotTime,
        available: !bookingMap.has(bookingKey),
      });
    }

    availableSlots.push({
      date: appointment.schedule_date.toISOString().split("T")[0],
      dayName: new Date(appointment.schedule_date).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      slots,
    });
  }

  return availableSlots;
};

module.exports = {
  calculateAvailableSlots,
};
