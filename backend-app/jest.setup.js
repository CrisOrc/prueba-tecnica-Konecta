const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

beforeAll(async () => {
  console.log("Setting up test database...");
  await prisma.$connect();
});

afterAll(async () => {
  console.log("Closing database connection...");
  await prisma.$disconnect();
});
