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

router.post("/add-appointment", auth, appointmentController.createAppointment);
router.get("/get-appointments", auth, appointmentController.getAppointments);
router.put(
  "/update-appointment/:id",
  auth,
  appointmentController.updateAppointment
);
router.delete(
  "/delete-appointment/:id",
  auth,
  appointmentController.deleteAppointment
);
module.exports = router;
