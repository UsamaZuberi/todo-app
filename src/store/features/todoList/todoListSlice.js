import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

// Sample Objects In todoList State
// {id: 1, title: '', isCompleted: true }

const todoListSlice = createSlice({
  // A name, used in action types
  name: "todoList",
  // The initial state for the reducer
  initialState,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    /* Add A Todo In Todo List */
    addTodo(state, action) {
      state.push(action.payload); // Directly Mutating (createSlice method internally handles this and not mutate directly so its allowed)
    },
    /* Delete A Todo From Todo List */
    deleteTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload);
    },
    /* Toggle Complete Status Of  A Todo In Todo List */
    toggleTodoStatus(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    // Reassign/ Set/ Overwrite Todo List
    setAllTodos(state, action) {
      return action.payload;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodoStatus, setAllTodos } =
  todoListSlice.actions;
export default todoListSlice.reducer;
