import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for authentication state management.
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    /**
     * Handles successful login by setting the token in the state and localStorage.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {string} action.payload - The authentication token.
     */
    loginSuccess: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    /**
     * Handles logout by clearing the token from the state and localStorage.
     *
     * @param {Object} state - The current state.
     */
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
