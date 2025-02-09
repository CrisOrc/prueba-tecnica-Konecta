import { fetchAPI } from "./api";

const USERS_API_URL = "http://localhost:5000/api/users"; // Endpoint to get users

/**
 * Fetches the list of users.
 *
 * @param {string} token - The authentication token.
 * @param {Function} [handleError] - Optional function to handle errors.
 * @returns {Promise<Object>} - Returns the list of users.
 */
export async function getUsers(token, handleError) {
  return fetchAPI(
    USERS_API_URL,
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
