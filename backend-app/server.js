require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { authenticate } = require("./src/middlewares/auth.middleware.js");
const { apiLimiter } = require("./src/middlewares/rateLimit.middleware.js");
const employeeRoutes = require("./src/routes/employee.routes.js");
const requestRoutes = require("./src/routes/request.routes.js");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const authRoutes = require("./src/routes/auth.routes.js");

const prisma = new PrismaClient();

/**
 * Initializes the Express application with necessary middlewares and routes.
 *
 * @module server
 */

/**
 * Middleware to parse JSON bodies.
 *
 * @name useJson
 * @function
 * @memberof module:server
 * @inner
 */
app.use(express.json());

/**
 * Middleware to enable CORS.
 *
 * @name useCors
 * @function
 * @memberof module:server
 * @inner
 */
app.use(cors());

/**
 * Middleware to secure the app by setting various HTTP headers.
 *
 * @name useHelmet
 * @function
 * @memberof module:server
 * @inner
 */
app.use(helmet());

/**
 * Middleware to log HTTP requests.
 *
 * @name useMorgan
 * @function
 * @memberof module:server
 * @inner
 */
app.use(morgan("dev"));

/**
 * Route for authentication-related endpoints.
 *
 * @name useAuthRoutes
 * @function
 * @memberof module:server
 * @inner
 */
app.use("/api/auth", authRoutes, apiLimiter);

/**
 * Route for employee-related endpoints.
 *
 * @name useEmployeeRoutes
 * @function
 * @memberof module:server
 * @inner
 */
app.use("/api/employee", employeeRoutes, apiLimiter);

/**
 * Route for request-related endpoints.
 *
 * @name useRequestRoutes
 * @function
 * @memberof module:server
 * @inner
 */
app.use("/api/request", requestRoutes, apiLimiter);

/**
 * Protected test route.
 *
 * @name getProtectedTest
 * @function
 * @memberof module:server
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/api/test/protected", authenticate, async (_req, res) => {
  res.json({ message: "Protected API" });
});

/**
 * Route to get all users.
 *
 * @name getUsers
 * @function
 * @memberof module:server
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/api/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/**
 * Test route.
 *
 * @name getTest
 * @function
 * @memberof module:server
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/api/test", async (_req, res) => {
  res.json({ message: "Test API" });
});

/**
 * Starts the server on the specified port.
 *
 * @name listen
 * @function
 * @memberof module:server
 * @inner
 * @param {number} PORT - The port number.
 */

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

/**
 * Global error handling middleware.
 *
 * @function
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

/**
 * CORS options configuration.
 *
 * @type {Object}
 * @property {Array<string>} origin - List of allowed origins.
 * @property {string} methods - Allowed HTTP methods.
 * @property {string} allowedHeaders - Allowed headers.
 */
const corsOptions = {
  origin: ["http://localhost:3000"], // Solo estos dominios pueden acceder
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
