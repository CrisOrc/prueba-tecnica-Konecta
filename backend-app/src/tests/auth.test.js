const request = require("supertest");
const app = require("../../app.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Authentication API Tests.
 *
 * @module tests/auth
 */

describe("Authentication API Tests", () => {
  let testUser;

  /**
   * Setup before all tests.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  beforeAll(async () => {
    testUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "testpassword",
        role: "USER",
      },
    });
  });

  /**
   * Cleanup after all tests.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  /**
   * Test for missing email in login request.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  test("Should return 400 if email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ password: "testpassword" });
    expect(res.status).toBe(400);
    expect(res.body.errors[0].msg).toBe("Invalid email format");
  });

  /**
   * Test for valid login.
   *
   * @function
   * @async
   * @returns {Promise<void>}
   */
  test("Should return 200 and a token on valid login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "testpassword",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
