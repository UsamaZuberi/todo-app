import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  // A name, used in action types
  name: "loggedInUser",
  // The initial state for the reducer
  initialState,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    /* Set Current LoggedIn User */
    setLoggedInUser(state, action) {
      return action.payload; // Directly Mutating (createSlice method internally handles this and not mutate directly so its allowed)
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;
export default authSlice.reducer;
