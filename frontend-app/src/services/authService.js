import { fetchAPI } from "./api";

const API_URL = "http://localhost:5000/api/auth";

/**
 * Logs in a user.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {Function} [handleError] - Optional function to handle errors.
 * @returns {Promise<Object>} - Returns the token if authentication is successful.
 */
export async function login(email, password, handleError) {
  return fetchAPI(
    `${API_URL}/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
    handleError,
  );
}

/**
 * Logs out a user by removing the token from local storage.
 */
export function logout() {
  localStorage.removeItem("token");
}
