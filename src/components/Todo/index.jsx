import React, { useState, useEffect, Fragment } from "react";
import styles from "./index.module.scss";
import Task from "components/Task";

const Todo = () => {
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [taskList, setTaskList] = useState([
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus obcaecati minus consectetur cum, veniam odio.",
      isCompleted: true,
    },
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus obcaecati minus consectetur cum, veniam odio.",
      isCompleted: false,
    },
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus obcaecati minus consectetur cum, veniam odio.",
      isCompleted: false,
    },
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus obcaecati minus consectetur cum, veniam odio.",
      isCompleted: false,
    },
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus obcaecati minus consectetur cum, veniam odio.",
      isCompleted: false,
    },
  ]);

  useEffect(() => {
    let completedTasks = 0;

    taskList.length &&
      taskList.forEach((task) => {
        if (task.isCompleted) {
          completedTasks += 1;
        }
      });

    setTasksCompleted(completedTasks);
  }, [taskList]);

  return (
    <div className={styles.todo}>
      <div className={styles.todo__wrapper}>
        <h2 className={styles.todo__heading}>Things to do:</h2>

        <hr />

        <ul className={styles.todo__list}>
          {taskList.length ? (
            <Fragment>
              {taskList.map((task) => {
                return (
                  <li className={styles.todo__listItem}>
                    <Task title={task.title} isCompleted={task.isCompleted} />
                  </li>
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              <li>Add a todo to get started...</li>
            </Fragment>
          )}
        </ul>

        <hr />

        <h2 className={styles.todo__heading}>Done: {tasksCompleted}</h2>

        <div className={styles.todo__taskInput}>
          <div className={styles.todo__input}>
            <input type="text" />
          </div>
          <div className={styles.todo__cta}>
            <button type="button">Add Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
