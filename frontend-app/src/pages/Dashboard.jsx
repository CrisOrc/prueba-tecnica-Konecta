import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * Dashboard component that displays the main dashboard and handles user logout.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the logout action by dispatching the logout action and navigating to the home page.
   */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
}
