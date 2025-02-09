import { fetchAPI } from "./api";

const EMPLOYEE_API_URL = "http://localhost:5000/api/employee";

/**
 * Fetches the list of employees.
 *
 * @param {string} token - The authentication token.
 * @param {Function} [handleError] - Optional function to handle errors.
 * @returns {Promise<Object>} - Returns the list of employees.
 */
export async function getEmployees(token, handleError) {
  return fetchAPI(
    EMPLOYEE_API_URL,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    handleError,
  );
}

/**
 * Creates a new employee.
 *
 * @param {Object} employeeData - The data of the employee to create.
 * @param {string} token - The authentication token.
 * @param {Function} [handleError] - Optional function to handle errors.
 * @returns {Promise<Object>} - Returns the created employee.
 */
export async function createEmployee(employeeData, token, handleError) {
  return fetchAPI(
    EMPLOYEE_API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    },
    handleError,
  );
}

/**
 * Updates an existing employee.
 *
 * @param {number} id - The ID of the employee to update.
 * @param {Object} employeeData - The data of the employee to update.
 * @param {string} token - The authentication token.
 * @param {Function} [handleError] - Optional function to handle errors.
 * @returns {Promise<Object>} - Returns the updated employee.
 */
export async function updateEmployee(id, employeeData, token, handleError) {
  return fetchAPI(
    `${EMPLOYEE_API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employeeData),
    },
    handleError,
  );
}
