import React from "react";
import styles from "./index.module.scss";

// Redux
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodoStatus,
} from "store/features/todoList/todoListSlice";

const Task = ({ taskInfo }) => {
  const dispatch = useDispatch();

  const checkboxHandler = () => {
    dispatch(toggleTodoStatus(taskInfo.id));
  };

  const removeTodo = () => {
    dispatch(deleteTodo(taskInfo.id));
  };

  return (
    <div className={styles.task}>
      <div className={styles.task__wrapper}>
        <div className={styles.task__checkbox}>
          <input
            id={taskInfo.id}
            type="checkbox"
            className={styles.task__checkbox__input}
            checked={taskInfo.isCompleted}
            onChange={checkboxHandler}
            hidden
          />

          <label
            htmlFor={taskInfo.id}
            className={styles.task__checkbox__label}
          ></label>
        </div>

        <p className={styles.task__title} title={taskInfo.title}>
          {taskInfo.title}
        </p>

        <div className={styles.task__cta}>
          <button type="button" onClick={removeTodo}>
            <span>&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
