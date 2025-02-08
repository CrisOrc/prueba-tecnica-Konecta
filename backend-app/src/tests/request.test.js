const request = require("supertest");
const app = require("../../app.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Request API Tests.
 *
 * @module tests/request
 */

describe("Request API Tests", () => {
  let employeeToken;

  /**
   * Setup before all tests.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  beforeAll(async () => {
    // 🔥 Get the token after login
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "employee@example.com",
      password: "testpassword",
    });

    employeeToken = loginRes.body.token;
    console.log("TOKEN OBTENIDO:", employeeToken); // For debugging
  });

  /**
   * Cleanup after all tests.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  afterAll(async () => {
    await prisma.request.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  /**
   * Test for creating a new request.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  test("Should create a new request", async () => {
    const res = await request(app)
      .post("/api/request") // 🔥 Verify the route is correct
      .set("Authorization", `Bearer ${employeeToken}`) // 🔥 Add the token to the request
      .send({ description: "New request", summary: "Request summary" });

    expect(res.status).toBe(201);
    expect(res.body.request).toBeDefined();
  });
});
