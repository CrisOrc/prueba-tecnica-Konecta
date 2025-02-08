const express = require("express");
const { register, login } = require("../controllers/aut.controller.js");
const { body } = require("express-validator");
const { validateRequest } = require("../middlewares/validation.middleware.js");

const router = express.Router();

/**
 * Defines the authentication routes.
 *
 * @module routes/auth
 */

/**
 * Route to register a new user.
 *
 * @name POST /register
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post(
  "/register",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("role")
      .isIn(["ADMIN", "EMPLOYEE", "USER"])
      .withMessage("Invalid role"),
    validateRequest,
  ],
  register,
);

/**
 * Route to log in a user.
 *
 * @name POST /login
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    validateRequest,
  ],
  login,
);

module.exports = router;
