import React from "react";
import styles from "./index.module.scss";

const Input = ({
  type = "text",
  name = "",
  value = "",
  placeholder = "",
  changeHandler,
}) => {
  const handleKeyDown = (event) => {
    const { keyCode } = event.target;
    if (keyCode === 13) {
      changeHandler(event);
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
