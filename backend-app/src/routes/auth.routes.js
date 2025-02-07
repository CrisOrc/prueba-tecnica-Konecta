const express = require("express");
const { register, login } = require("../controllers/auth.controller.js");

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
router.post("/register", register);

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
router.post("/login", login);

module.exports = router;
