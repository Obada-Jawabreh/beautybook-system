require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // const token = req.headers.authorization?.split(" ")[1];
    // console.log(req.headers.authorization);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = authMiddleware;
