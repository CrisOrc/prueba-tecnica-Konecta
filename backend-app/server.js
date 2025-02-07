require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const {
  authenticate,
  authorize,
} = require("./src/middlewares/auth.middleware.js");
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
app.use("/api/auth", authRoutes);

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
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
