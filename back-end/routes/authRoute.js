const express = require("express");
const router = express.Router();
const authController = require("../controllers/sharedController/auth");

const {
  registerSchema,
  loginSchema,
} = require("../middleware/schema/authSchema");

router.post("/login", loginSchema, authController.login);
router.post("/register", registerSchema, authController.register);
router.get("/admins", authController.getAdmins);

module.exports = router;
