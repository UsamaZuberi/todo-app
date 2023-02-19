import React, { useState, useEffect, Fragment } from "react";
import styles from "./index.module.scss";
import Task from "components/Task";

// Utility Functions
import { guid } from "utils/inputValidations";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "store/features/todoList/todoListSlice";

const Todo = () => {
  const dispatch = useDispatch();
  const todoListState = useSelector((state) => state.todoList);

  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [todoInputValue, setTodoInputValue] = useState("");

  const todoChangeHandler = ({ target }) => {
    setTodoInputValue(target.value);
  };

  const createTodo = () => {
    if (todoInputValue) {
      dispatch(
        addTodo({
          id: guid(),
          title: todoInputValue,
          isCompleted: false,
        })
      );

      setTodoInputValue("");
    } else {
    }
  };

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      createTodo();
    }
  };

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
                    <Task taskInfo={task} />
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
            <input
              type="text"
              value={todoInputValue}
              onChange={todoChangeHandler}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          <div className={styles.todo__cta}>
            <button
              type="button"
              onClick={createTodo}
              disabled={!todoInputValue}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
