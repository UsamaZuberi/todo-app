import React, { useState, useEffect, Fragment } from "react";
import styles from "./index.module.scss";
import Task from "components/Task";
import Button from "components/Button";
import Input from "components/Input";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodoStatus,
  deleteTodo,
  setAllTodos,
} from "store/features/todoList/todoListSlice";

// Firebase
import {
  collection,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "configs/firbaseConfig";

const Todo = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const todoListState = useSelector((state) => state.todoList);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [todoInputValue, setTodoInputValue] = useState("");

  // Create Todo Input Change Handler
  const todoChangeHandler = ({ target }) => {
    setTodoInputValue(target.value);
  };

  // Create New Todo
  const createTodoFunc = async () => {
    try {
      if (todoInputValue) {
        // Add a new document with a generated id.
        addDoc(collection(db, "todos"), {
          title: todoInputValue,
          isCompleted: false,
          uid: user.uid,
        }).then((docRef) => {
          // Dispatch New Created Todo In Store
          dispatch(
            addTodo({
              id: docRef.id,
              title: todoInputValue,
              isCompleted: false,
              uid: user.uid,
            })
          );
          setTodoInputValue("");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle Todo Complete Status
  const updateTodoFunc = async (id) => {
    try {
      if (id) {
        const todo = todoListState.find((todo) => todo.id === id);
        dispatch(toggleTodoStatus(id));

        if (todo) {
          updateDoc(doc(db, "todos", id), {
            isCompleted: !todo.isCompleted,
          });
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(toggleTodoStatus(id));
    }
  };

  // Delete Todo
  const deleteTodoFunc = async (id) => {
    try {
      if (id) {
        const todo = todoListState.find((todo) => todo.id === id);
        dispatch(deleteTodo(id));

        if (todo) {
          deleteDoc(doc(db, "todos", id));
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteTodo(id));
    }
  };

  // Fetch Current User Todo List
  const fetchTodoList = async () => {
    try {
      if (user && user.uid) {
        const todosRef = collection(db, "todos");
        const q = query(todosRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const todoListArray = [];

        querySnapshot.forEach((doc) => {
          todoListArray.push({ ...doc.data(), id: doc.id });
        });

        dispatch(setAllTodos(todoListArray));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // To Feth All Todos
  useEffect(() => {
    fetchTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // To Keep Track Of Done Todos
  useEffect(() => {
    let completedTasks = 0;

    todoListState.length &&
      todoListState.forEach((task) => {
        if (task.isCompleted) {
          completedTasks += 1;
        }
      });
    setTasksCompleted(completedTasks);
  }, [todoListState]);

  // Parse & Set Current User State
  useEffect(() => {
    dispatch(setAllTodos([]));

    if (Object.keys(loggedInUser).length) {
      setUser(JSON.parse(loggedInUser));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  return (
    <div className={styles.todo}>
      <div className={styles.todo__wrapper}>
        <h2 className={styles.todo__heading}>Things to do:</h2>

        <hr />

        <ul className={styles.todo__list}>
          {todoListState.length ? (
            <Fragment>
              {todoListState.map((task) => {
                return (
                  <li key={task.id} className={styles.todo__listItem}>
                    <Task
                      taskInfo={task}
                      updateTodo={updateTodoFunc}
                      deleteTodo={deleteTodoFunc}
                    />
                  </li>
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              <li className={styles.todo__listItem}>
                <p className={styles.todo__noDataFound}>
                  Add a todo task to get started...
                </p>
              </li>
            </Fragment>
          )}
        </ul>

        <hr />

        <h2 className={styles.todo__heading}>Done: {tasksCompleted}</h2>

        <div className={styles.todo__taskInput}>
          <div className={styles.todo__input}>
            <Input
              type="text"
              name="taskInput"
              value={todoInputValue}
              changeHandler={todoChangeHandler}
              submitHandler={createTodoFunc}
            />
          </div>

          <div className={styles.todo__cta}>
            <Button
              type="button"
              title="Add Task"
              clickHandler={createTodoFunc}
              disabled={!todoInputValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
