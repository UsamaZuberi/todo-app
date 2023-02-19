import React from "react";
import styles from "./index.module.scss";

const Button = ({ type = "button", title = "", clickHandler, disabled = false }) => {
  return (
    <button type={type} onClick={clickHandler} disabled={disabled} className={styles.button} >
      {title}
    </button>
  );
};

export default Button;
