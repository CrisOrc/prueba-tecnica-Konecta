import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing employee state.
 */
const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
  },
  reducers: {
    /**
     * Sets the list of employees in the state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {Array} action.payload - The list of employees.
     */
    setEmployees: (state, action) => {
      state.employees = Array.isArray(action.payload) ? action.payload : [];
    },
    /**
     * Adds a new employee to the state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {Object} action.payload - The new employee to add.
     */
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    /**
     * Updates an existing employee in the state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {Object} action.payload - The updated employee data.
     */
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id,
      );
      if (index !== -1) state.employees[index] = action.payload;
    },
  },
});

export const { setEmployees, addEmployee, updateEmployee } =
  employeesSlice.actions;
export default employeesSlice.reducer;
