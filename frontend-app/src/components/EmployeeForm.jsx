import { useState, useEffect } from "react";
import { getUsers } from "../services/userService.js";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

/**
 * EmployeeForm component for creating or updating an employee.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSubmit - Function to call when the form is submitted.
 * @param {Object} [props.initialData] - Initial data to populate the form.
 * @param {number} [props.initialData.userId] - Initial user ID.
 * @param {string} [props.initialData.hireDate] - Initial hire date.
 * @param {number} [props.initialData.salary] - Initial salary.
 * @returns {JSX.Element} The rendered component.
 */
export default function EmployeeForm({ onSubmit, initialData }) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (initialData) {
      setSelectedUserId(initialData.userId || "");
      setHireDate(initialData.hireDate || "");
      setSalary(initialData.salary || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      userId: parseInt(selectedUserId, 10), // Convert to number
      hireDate: new Date(hireDate).toISOString(), // Convert to ISO date format
      salary: parseFloat(salary), // Convert to float
    };

    console.log("Sending data to backend:", employeeData); // Debug

    onSubmit(employeeData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
    >
      <label className="block text-gray-700">Select User</label>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.nombre} - {user.email}
          </option>
        ))}
      </select>

      <label className="block text-gray-700">Hire Date</label>
      <input
        type="date"
        placeholder="Hire Date"
        value={hireDate}
        onChange={(e) => setHireDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <label className="block text-gray-700">Salary</label>
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {initialData ? "Update" : "Create"} Employee
      </button>
    </form>
  );
}

// prop-types validation
EmployeeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    userId: PropTypes.number,
    hireDate: PropTypes.string,
    salary: PropTypes.number,
  }),
};

// default props
EmployeeForm.defaultProps = {
  initialData: null,
};
