const prisma = require("../../config/DBprisma");

const createAppointment = async (req, res) => {
  try {
    let { schedule_date, start_time, end_time } = req.body;

    if (!schedule_date) {
      return res.status(400).json({ message: "schedule_date is required" });
    }
    if (!start_time) {
      return res.status(400).json({ message: "start_time is required" });
    }

    if (!end_time) {
      return res.status(400).json({ message: "end_time is required" });
    }

    const isoScheduleDate = new Date(schedule_date).toISOString();

    const newAppointment = await prisma.appointment.create({
      data: {
        staff_id: req.user.id,
        schedule_date: isoScheduleDate,
        start_time,
        end_time,
      },
    });

    return res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ message: "Failed to create appointment" });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { staff_id: req.user.id },
      orderBy: { schedule_date: "asc" },
    });

    return res.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error.message, error.stack);
    return res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { schedule_date, start_time, end_time } = req.body;
    const isoScheduleDate = new Date(schedule_date).toISOString();

    const updatedAppointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: {
        schedule_date: isoScheduleDate,
        start_time,
        end_time,
      },
    });

    return res.json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    return res.status(500).json({ message: "Failed to update appointment" });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.appointment.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({ message: "Failed to delete appointment" });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
