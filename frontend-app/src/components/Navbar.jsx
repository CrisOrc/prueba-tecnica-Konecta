import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import decodeJWT from "../adapters/decodeJWT";

/**
 * Navbar component that displays navigation links based on user role.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const decodedToken = decodeJWT(token);
  const role = decodedToken?.role;
  const dispatch = useDispatch();

  /**
   * Handles the logout action by dispatching the logout action.
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {role && (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
          <div className="flex space-x-4">
            <Link to="/dashboard" className="hover:underline">
              Inicio
            </Link>

            {role === "ADMIN" && (
              <Link to="/employees" className="hover:underline">
                Empleados
              </Link>
            )}
            {(role === "EMPLOYEE" || role === "ADMIN") && (
              <Link to="/requests" className="hover:underline">
                Solicitudes
              </Link>
            )}
          </div>

          {role && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded"
            >
              Cerrar sesión
            </button>
          )}
        </nav>
      )}
    </>
  );
}
