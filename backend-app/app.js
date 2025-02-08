require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./src/routes/auth.routes.js");
const employeeRoutes = require("./src/routes/employee.routes.js");
const requestRoutes = require("./src/routes/request.routes.js");

const app = express();

/**
 * Express application instance.
 *
 * @module app
 */

/**
 * Middleware configuration.
 *
 * @function
 */
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/**
 * Route definitions.
 *
 * @function
 */
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/request", requestRoutes);

module.exports = app;
