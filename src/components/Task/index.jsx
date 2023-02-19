import React from "react";
import { guid } from "utils/inputValidations";
import styles from "./index.module.scss";

const Task = ({ title, isCompleted }) => {
  const checkboxId = guid();

  return (
    <div className={styles.task}>
      <div className={styles.task__wrapper}>
        <div className={styles.task__checkbox}>
          <input
            id={checkboxId}
            type="checkbox"
            className={styles.task__checkbox__input}
            checked={isCompleted}
            hidden
          />
          <label
            htmlFor={checkboxId}
            className={styles.task__checkbox__label}
          ></label>
        </div>
        <p className={styles.task__title}>{title}</p>
        <div className={styles.task__cta}>
          <button type="button">
            <span>&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
