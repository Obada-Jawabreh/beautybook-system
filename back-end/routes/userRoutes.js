const express = require("express");
const router = express.Router();
const adminController = require("../controllers/userController/admin");
const servicesController = require("../controllers/userController/services");
const bookingController = require("../controllers/userController/booking");
const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
router.get(
  "/all-admin",
  auth,
  checkRole(["user"]),
  adminController.getAllAdmins
);
router.get(
  "/center/:centerId",
  auth,
  checkRole(["user"]),
  adminController.getCenterData
);
router.get(
  "/staff-details/:staffId",
  auth,
  checkRole(["user"]),
  servicesController.getStaffDetails
);
router.post(
  "/add-booking",
  auth,
  checkRole(["user"]),
  bookingController.createBooking
);
router.get(
  "/my-booking",
  auth,
  checkRole(["user"]),
  bookingController.getBookings
);

module.exports = router;
