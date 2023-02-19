import React, { useState, useEffect, Fragment } from "react";
import styles from "./index.module.scss";
import Task from "components/Task";
import Button from "components/Button";
import Input from "components/Input";

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
            <Input
              type="text"
              name="taskInput"
              value={todoInputValue}
              changeHandler={todoChangeHandler}
            />
          </div>
          
          <div className={styles.todo__cta}>
            <Button
              type="button"
              title="Add Task"
              clickHandler={createTodo}
              disabled={!todoInputValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
