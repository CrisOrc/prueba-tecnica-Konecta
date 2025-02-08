const request = require("supertest");
const app = require("../../app.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Employee API Tests.
 *
 * @module tests/employee
 */

describe("Employee API Tests", () => {
  let adminToken;

  /**
   * Setup before all tests.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  beforeAll(async () => {
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: "$2b$10$testpassword", // Password should be encrypted
        role: "ADMIN",
      },
    });

    // 🔥 Get the token after login
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "testpassword",
    });

    adminToken = loginRes.body.token;
    console.log("ADMIN TOKEN:", adminToken); // For debugging
  });

  /**
   * Cleanup after all tests.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  afterAll(async () => {
    await prisma.employee.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  /**
   * Test for creating a new employee.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  test("Should create a new employee", async () => {
    const res = await request(app)
      .post("/api/employee") // 🔥 Verify the route is correct
      .set("Authorization", `Bearer ${adminToken}`) // 🔥 Add the token
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
        role: "EMPLOYEE",
        hireDate: "2024-02-10",
        salary: 40000,
      });

    expect(res.status).toBe(201);
    expect(res.body.employee).toBeDefined();
  });
});
