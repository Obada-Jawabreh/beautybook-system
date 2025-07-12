const express = require("express");
const router = express.Router();
const adminController = require("../controllers/userController/admin");
const servicesController = require("../controllers/userController/services");
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
module.exports = router;
