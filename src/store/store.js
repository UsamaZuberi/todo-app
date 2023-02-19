import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./features/todoList/todoListSlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    loggedInUser: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
