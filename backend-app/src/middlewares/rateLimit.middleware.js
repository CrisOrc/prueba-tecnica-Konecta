const rateLimit = require("express-rate-limit");

/**
 * Middleware to limit repeated requests to public APIs.
 *
 * @type {Object}
 * @property {number} windowMs - Time frame for which requests are checked/remembered (in milliseconds).
 * @property {number} max - Maximum number of connections during `windowMs` before sending a 429 response.
 * @property {string} message - Message to send when rate limit is exceeded.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: "Too many requests from this IP, please try again later.",
});

module.exports = { apiLimiter };
