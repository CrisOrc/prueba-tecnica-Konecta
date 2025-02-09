import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployees,
  addEmployee,
  updateEmployee,
} from "../store/employeeSlice.js";
import {
  getEmployees,
  createEmployee,
  updateEmployee as updateEmployeeAPI,
} from "../services/employeeService.js";
import EmployeeForm from "../components/EmployeeForm.jsx";
import { useError } from "../context/ErrorContext.jsx";

/**
 * Employees component that displays a list of employees and handles creating and updating employees.
 *
 * @returns {JSX.Element} The rendered Employees component.
 */
export default function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const token = useSelector((state) => state.auth.token);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { handleError } = useError();

  /**
   * Fetches the list of employees from the API and dispatches the setEmployees action.
   */
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees(token, handleError);
        dispatch(setEmployees(data.employees));
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchEmployees();
  }, [dispatch, token, handleError]);

  /**
   * Handles the creation of a new employee by calling the createEmployee API and dispatching the addEmployee action.
   *
   * @param {Object} employeeData - The data of the employee to create.
   */
  const handleCreate = async (employeeData) => {
    try {
      const newEmployee = await createEmployee(
        employeeData,
        token,
        handleError,
      );
      dispatch(addEmployee(newEmployee));
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * Handles the update of an existing employee by calling the updateEmployee API and dispatching the updateEmployee action.
   *
   * @param {Object} employeeData - The data of the employee to update.
   */
  const handleEdit = async (employeeData) => {
    try {
      const updatedEmployee = await updateEmployeeAPI(
        selectedEmployee.id,
        employeeData,
        token,
        handleError,
      );
      dispatch(updateEmployee(updatedEmployee));
      setSelectedEmployee(null);
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Lista de Empleados</h1>
      <button
        onClick={() => {
          setSelectedEmployee(null);
          setShowForm(true);
        }}
        className="mb-4 bg-green-500 text-white p-2 rounded"
      >
        Crear Nuevo Empleado
      </button>

      {showForm && (
        <EmployeeForm
          onSubmit={selectedEmployee ? handleEdit : handleCreate}
          initialData={selectedEmployee}
        />
      )}

      <ul className="mt-4">
        {employees.map((emp) => (
          <li key={emp.id} className="p-2 border-b flex justify-between">
            {emp.user.name} | {emp.user.email} | Salario: ${emp.salary}
            <button
              onClick={() => {
                setSelectedEmployee(emp);
                setShowForm(true);
              }}
              className="text-blue-500"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
