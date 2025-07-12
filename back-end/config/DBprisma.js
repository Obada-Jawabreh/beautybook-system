// config/prismaClient.js
const { PrismaClient } = require("@prisma/client");
const config = require("./env");
const colors = require("colors");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.databaseUrl,
    },
  },
});

prisma
  .$connect()
  .then(() => {
    console.log(
      colors.bgCyan("✅ Connected to MySQL database successfully using Prisma.")
    );
  })
  .catch((err) => {
    console.error(
      colors.bgRed("❌ Failed to connect to the database with Prisma:"),
      err
    );
    process.exit(1);
  });

module.exports = prisma;
