const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get requests with pagination and advanced filters.
 *
 * @async
 * @function getRequests
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getRequests = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      employeeId,
      adminId,
      startDate,
      endDate,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};

    if (employeeId) where.employeeId = parseInt(employeeId);
    if (adminId) where.adminId = parseInt(adminId);

    // Filter by date range
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const requests = await prisma.request.findMany({
      where,
      skip,
      take,
      orderBy: { id: "desc" },
      include: { employee: true, admin: true },
    });

    const total = await prisma.request.count({ where });

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / take),
      limit: take,
      requests,
    });
  } catch (error) {
    console.error("Error retrieving requests:", error);
    res
      .status(500)
      .json({ message: "Error retrieving requests", error: error.message });
  }
};

/**
 * Generate a random code for the request.
 *
 * @function generateRequestCode
 * @returns {string} The generated request code.
 */
const generateRequestCode = () => {
  return `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
};

/**
 * Create a new request (Employees and Admins).
 *
 * @async
 * @function createRequest
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const createRequest = async (req, res) => {
  const { description, summary } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    let employee = null;
    let adminId = null;

    if (user.role === "EMPLOYEE") {
      employee = await prisma.employee.findFirst({
        where: { userId: user.id },
      });
      if (!employee) {
        return res.status(403).json({ message: "Employee record not found" });
      }
    } else if (user.role === "ADMIN") {
      adminId = user.id;
    }

    // Create the request with employeeId or adminId
    const request = await prisma.request.create({
      data: {
        code: generateRequestCode(),
        description,
        summary: summary || "",
        employeeId: employee ? employee.id : null,
        adminId,
      },
    });

    res.status(201).json({ message: "Request created successfully", request });
  } catch (error) {
    console.error("Error creating request:", error);
    res
      .status(500)
      .json({ message: "Error creating request", error: error.message });
  }
};

/**
 * Delete a request (Admins only).
 *
 * @async
 * @function deleteRequest
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the request exists
    const request = await prisma.request.findUnique({
      where: { id: parseInt(id) },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Delete the request
    await prisma.request.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting request", error });
  }
};

module.exports = { getRequests, createRequest, deleteRequest };
