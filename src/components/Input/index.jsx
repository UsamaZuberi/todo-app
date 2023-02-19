import React from "react";
import styles from "./index.module.scss";

const Input = ({
  type = "text",
  name = "",
  value = "",
  placeholder = "",
  changeHandler,
  submitHandler
}) => {
  const handleKeyDown = (event) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      submitHandler && submitHandler();
    }
  };

  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={changeHandler}
      onKeyDown={handleKeyDown}
      className={styles.input}
    />
  );
};

export default Input;
