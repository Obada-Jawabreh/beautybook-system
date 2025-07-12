const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const https = require("https");
const http = require("http");
const colors = require("colors");
require("dotenv").config();
const path = require("path");
const prisma = require("./config/DBprisma");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Hello from backend " });
});

const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const staffRoutes = require("./routes/staffRoute");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/staff", staffRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(colors.bgGreen(`Server running on http://localhost:${PORT}`));
});
// // Start the server
// const useSSL = process.env.SSL === "true";

// let server;

// if (useSSL) {
//   const sslCertPath = process.env.SSL_CERT_PATH;
//   const sslKeyPath = process.env.SSL_KEY_PATH;

//   if (fs.existsSync(sslCertPath) && fs.existsSync(sslKeyPath)) {
//     const options = {
//       key: fs.readFileSync(sslKeyPath),
//       cert: fs.readFileSync(sslCertPath),
//     };
//     server = https.createServer(options, app);
//     server.listen(PORT, () => {
//       console.log(`Secure server running on https://localhost:${PORT}`.green);
//     });
//   } else {
//     console.error("SSL certificate or key not found!".red);
//     process.exit(1);
//   }
// } else {
//   server = http.createServer(app);
//   server.listen(PORT, () => {
//     console.log(colors.bgGreen(`Server running on http://localhost:${PORT}`));
//   });
// }
