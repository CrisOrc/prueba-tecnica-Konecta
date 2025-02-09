import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Requests from "../pages/Requests";
import Navbar from "../components/Navbar";

/**
 * Lazy-loaded components for code splitting.
 */
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Employees = lazy(() => import("../pages/Employees"));

/**
 * AppRoutes component that defines the application's routing structure.
 *
 * @returns {JSX.Element} The rendered AppRoutes component.
 */
export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<PrivateRoute requiredRole={["ADMIN"]} />}>
            <Route path="/employees" element={<Employees />} />
          </Route>
          <Route
            element={<PrivateRoute requiredRole={["EMPLOYEE", "ADMIN"]} />}
          >
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
