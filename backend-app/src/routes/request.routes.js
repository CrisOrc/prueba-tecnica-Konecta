const express = require("express");
const {
  getRequests,
  createRequest,
  deleteRequest,
} = require("../controllers/request.controller.js");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

/**
 * Request routes.
 *
 * @module routes/request
 */

/**
 * Route to get all requests.
 *
 * @name GET /
 * @function
 * @memberof module:routes/request
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get("/", authenticate, authorize(["EMPLOYEE", "ADMIN"]), getRequests);

/**
 * Route to create a new request.
 *
 * @name POST /
 * @function
 * @memberof module:routes/request
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post("/", authenticate, authorize(["EMPLOYEE", "ADMIN"]), createRequest);

/**
 * Route to delete a request.
 *
 * @name DELETE /:id
 * @function
 * @memberof module:routes/request
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteRequest);

module.exports = router;
