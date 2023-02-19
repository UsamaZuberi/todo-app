import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "components/Button";
import styles from "./index.module.scss";
import Input from "components/Input";

const AuthForm = ({ variant }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const clickHandler = () => {};

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.authScreen}>
      <div className={styles.authScreen__wrapper}>
        <div>
          <h1 className={styles.authScreen__title}>
            {variant === "signUp" ? "Create an Account" : "Login"}
          </h1>
        </div>

        <form className={styles.authScreen__form}>
          <div className={styles.authScreen__formGroup}>
            <Input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              changeHandler={inputChangeHandler}
            />
          </div>

          <div className={styles.authScreen__formGroup}>
            <Input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              changeHandler={inputChangeHandler}
            />
          </div>

          <div className={styles.authScreen__formGroup}>
            <Button
              title={variant === "signUp" ? "Create Account" : "Login"}
              clickHandler={clickHandler}
            />
          </div>
        </form>

        <div>
          {variant === "signUp" ? (
            <p className={styles.authScreen__text}>
              Already have an account? <Link to="/sign-in">Sign in</Link>
            </p>
          ) : (
            <p className={styles.authScreen__text}>
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
