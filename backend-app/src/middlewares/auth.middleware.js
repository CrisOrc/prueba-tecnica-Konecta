const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

/**
 * Middleware to verify authentication.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers.Authorization - The authorization header containing the token.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * Middleware to verify if the user has a specific role.
 *
 * @param {string[]} roles - The roles that are allowed to access the route.
 * @returns {Function} Middleware function to check the user's role.
 */
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: "Access denied, insufficient permissions" });
  }
  next();
};

module.exports = { authenticate, authorize };
