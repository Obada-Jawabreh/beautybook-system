const fs = require("fs");
const path = require("path");
require("dotenv").config();

const requiredEnvVars = [
  "PORT",
  "DB_PORT",
  "DB_NAME",
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "JWT_SECRET",
];

const missing = requiredEnvVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error("❌ Missing environment variables:", missing);
  process.exit(1);
}

const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const config = {
  port: parseInt(process.env.PORT, 10),
  db,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: `mysql://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`,
};

module.exports = config;
