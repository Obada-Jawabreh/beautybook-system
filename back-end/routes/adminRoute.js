const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/adminController/services");
const staffController = require("../controllers/adminController/staff");
const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

const {
  addServiceSchema,
  addStaffSchema,
} = require("../middleware/schema/adminSchema");

router.post(
  "/add-service",
  auth,
  checkRole(["admin"]),
  addServiceSchema,
  serviceController.addService
);
router.put(
  "/update-service/:id",
  auth,
  checkRole(["admin"]),
  addServiceSchema,
  serviceController.updateService
);
router.get(
  "/all-services-staff",
  auth,
  checkRole(["admin"]),
  serviceController.getServicesAndStaff
);

// Delete Service
router.delete(
  "/delete-service/:id",
  auth,
  checkRole(["admin"]),
  serviceController.deleteService
);


//  Update staff status (approve/reject)
router.put(
  "/update-staff-status/:id",
  auth,
  checkRole(["admin"]),
  staffController.updateStaffStatus
);

//  Get all staff (any status)
router.get(
  "/all-staff",
  auth,
  checkRole(["admin"]),
  staffController.getAllStaff
);
module.exports = router;
