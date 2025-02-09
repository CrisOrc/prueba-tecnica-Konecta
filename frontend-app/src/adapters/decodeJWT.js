import { jwtDecode } from "jwt-decode";

/**
 * Decodes a JWT token and extracts user data.
 *
 * @param {string} token - The JWT token to decode.
 * @returns {Object|null} - Returns an object with user data or null if the token is invalid.
 */
export default function decodeJWT(token) {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) return null;

    const now = new Date().getTime() / 1000;
    if (decoded.exp < now) return null;

    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
