import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing request state.
 */
const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
  },
  reducers: {
    /**
     * Sets the list of requests in the state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {Array} action.payload - The list of requests.
     */
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    /**
     * Adds a new request to the state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {Object} action.payload - The new request to add.
     */
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    /**
     * Deletes a request from the state by ID.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The dispatched action.
     * @param {number} action.payload - The ID of the request to delete.
     */
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter(
        (req) => req.id !== action.payload,
      );
    },
  },
});

export const { setRequests, addRequest, deleteRequest } = requestSlice.actions;
export default requestSlice.reducer;
