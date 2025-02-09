import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useError } from "../context/ErrorContext";

/**
 * Login component that handles user authentication.
 *
 * @returns {JSX.Element} The rendered Login component.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleError } = useError();

  /**
   * Handles the form submission for logging in.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password, handleError); // ✅ Pass `handleError`
      dispatch(loginSuccess(data.token));
      navigate("/dashboard");
    } catch (err) {
      console.error("Error in login:", err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
