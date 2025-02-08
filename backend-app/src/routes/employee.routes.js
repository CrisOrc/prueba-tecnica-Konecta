const express = require("express");
const {
  getEmployees,
  createEmployee,
  deleteEmployee,
} = require("../controllers/employee.controller.js");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

/**
 * Employee routes.
 *
 * @module routes/employee
 */

/**
 * Route to get all employees.
 *
 * @name GET /
 * @function
 * @memberof module:routes/employee
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get("/", authenticate, getEmployees);

/**
 * Route to create a new employee.
 *
 * @name POST /
 * @function
 * @memberof module:routes/employee
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post("/", authenticate, authorize(["ADMIN"]), createEmployee);

/**
 * Route to delete an employee.
 *
 * @name DELETE /:id
 * @function
 * @memberof module:routes/employee
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteEmployee);

module.exports = router;
