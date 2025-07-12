const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/staffController/services");
const appointmentController = require("../controllers/staffController/appointment");
const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
router.get(
  "/my-services",
  auth,
  checkRole(["staff"]),
  servicesController.getMyServices
);
router.get("/my-users", auth, servicesController.getMyClients);

router.post(
  "/add-appointment",
  auth,
  checkRole(["staff"]),
  appointmentController.createAppointment
);
router.get(
  "/get-appointments",
  auth,
  checkRole(["staff"]),
  appointmentController.getAppointments
);
router.put(
  "/update-appointment/:id",
  auth,
  checkRole(["staff"]),

  appointmentController.updateAppointment
);
router.delete(
  "/delete-appointment/:id",
  auth,
  checkRole(["staff"]),
  appointmentController.deleteAppointment
);
router.put(
  "/update-booking-status/:bookingId",
  auth,
  checkRole(["staff"]),
  servicesController.updateBookingStatus
);
module.exports = router;
