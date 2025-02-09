/**
 * Global function to make HTTP requests with error handling.
 *
 * @param {string} url - The API URL.
 * @param {Object} [options={}] - The request options.
 * @param {Function} [handleError] - Function to handle errors.
 * @returns {Promise<Object>} - The JSON response.
 * @throws {Error} - If the request fails.
 */
export async function fetchAPI(url, options = {}, handleError) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request error");
    }

    return data;
  } catch (error) {
    if (handleError) handleError(error.message);
    throw error;
  }
}
