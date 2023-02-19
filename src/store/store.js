import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from './features/todoList/todoListSlice';

const store = configureStore({
    reducer: {
        todoList: todoListReducer,
    }
});

export default store;