import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decodeJWT from "../adapters/decodeJWT";
import PropTypes from "prop-types";
import { logout } from "../store/authSlice";

/**
 * PrivateRoute component that restricts access based on user roles.
 *
 * @param {Object} props - Component props.
 * @param {Array<string>} props.requiredRole - Array of roles that are allowed to access the route.
 * @returns {JSX.Element|null} The rendered component or null if access is denied.
 */
export default function PrivateRoute({ requiredRole = [] }) {
  const token = useSelector((state) => state.auth.token);
  const decodedToken = decodeJWT(token);
  const role = decodedToken?.role;
  const dispatch = useDispatch();

  if (!requiredRole) {
    dispatch(logout());
    return null;
  }

  return role && requiredRole.includes(role) ? <Outlet /> : <Navigate to="/" />;
}

// prop-types validation
PrivateRoute.propTypes = {
  requiredRole: PropTypes.arrayOf(PropTypes.string).isRequired,
};
