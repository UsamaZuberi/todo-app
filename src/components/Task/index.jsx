import React from "react";
import styles from "./index.module.scss";

const Task = ({ taskInfo, updateTodo, deleteTodo }) => {
  return (
    <div className={styles.task}>
      <div className={styles.task__wrapper}>
        <div className={styles.task__checkbox}>
          <input
            id={taskInfo.id}
            type="checkbox"
            className={styles.task__checkbox__input}
            checked={taskInfo.isCompleted}
            onChange={() => updateTodo(taskInfo.id)}
            hidden
          />

          <label
            htmlFor={taskInfo.id}
            className={styles.task__checkbox__label}
          ></label>
        </div>

        <p className={`${styles.task__title} ${taskInfo.isCompleted ? styles['task__title--completed'] : ''}`} title={taskInfo.title}>
          {taskInfo.title}
        </p>

        <div className={styles.task__cta}>
          <button type="button" onClick={()=> deleteTodo(taskInfo.id)}>
            <span>&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
