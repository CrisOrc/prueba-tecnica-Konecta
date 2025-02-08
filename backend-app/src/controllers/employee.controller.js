const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get employees with pagination and advanced filters.
 *
 * @async
 * @function getEmployees
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, minSalary, maxSalary } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};

    if (name) where.user = { name: { contains: name, mode: "insensitive" } };

    // Filter by salary range
    if (minSalary && maxSalary) {
      where.salary = {
        gte: parseFloat(minSalary),
        lte: parseFloat(maxSalary),
      };
    }

    const employees = await prisma.employee.findMany({
      where,
      skip,
      take,
      orderBy: { id: "desc" },
      include: { user: true },
    });

    const total = await prisma.employee.count({ where });

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / take),
      limit: take,
      employees,
    });
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res
      .status(500)
      .json({ message: "Error retrieving employees", error: error.message });
  }
};

/**
 * Create a new employee (Admin only).
 *
 * @async
 * @function createEmployee
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const createEmployee = async (req, res) => {
  const { name, email, password, role, hireDate, salary } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user in the Users table
    const user = await prisma.user.create({
      data: { name, email, password, role },
    });

    // Create the employee linked to the user
    const employee = await prisma.employee.create({
      data: {
        userId: user.id,
        hireDate: new Date(hireDate),
        salary: parseFloat(salary),
      },
    });

    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

/**
 * Delete an employee (Admin only).
 *
 * @async
 * @function deleteEmployee
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete the employee first, then the associated user
    await prisma.employee.delete({ where: { id: parseInt(id) } });
    await prisma.user.delete({ where: { id: employee.userId } });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

/**
 * Update an employee (Admin only).
 *
 * @async
 * @function updateEmployee
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { hireDate, salary } = req.body;

  try {
    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        hireDate: new Date(hireDate),
        salary: parseFloat(salary),
      },
    });

    res.json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
