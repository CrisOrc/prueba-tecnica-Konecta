import { fetchAPI } from "./api";

const API_URL = "http://localhost:5000/api/request";

/**
 * Fetches all requests. Employees see their own requests, admins see all requests.
 *
 * @param {string} token - The authentication token.
 * @param {Function} [handleError] - Optional function to handle errors.
 * @returns {Promise<Object>} - Returns the list of requests.
 */
export async function getRequests(token, handleError) {
  return fetchAPI(
    API_URL,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    handleError,
  );
}

/**
 * Creates a new request. Only employees can create requests.
 *
 * @param {Object} requestData - The data of the request to create.
 * @param {string} token - The authentication token.
 * @param {Function} [handleError] - Optional function to handle errors.
 * @returns {Promise<Object>} - Returns the created request.
 */
export async function createRequest(requestData, token, handleError) {
  return fetchAPI(
    API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    },
    handleError,
  );
}

/**
 * Deletes a request by ID.
 *
 * @param {number} id - The ID of the request to delete.
 * @param {string} token - The authentication token.
 * @param {Function} [handleError] - Optional function to handle errors.
 * @returns {Promise<Object>} - Returns the deleted request.
 */
export async function deleteRequest(id, token, handleError) {
  return fetchAPI(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    handleError,
  );
}
