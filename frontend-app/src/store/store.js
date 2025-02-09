import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import employeesReducer from "./employeeSlice.js";
import requestReducer from "./requestSlice.js";

/**
 * Configures the Redux store with the specified reducers.
 *
 * @returns {Object} The configured Redux store.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    requests: requestReducer,
  },
});
