import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "components/Button";
import styles from "./index.module.scss";
import Input from "components/Input";

// Redux
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "store/features/auth/authSlice";

// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "configs/firbaseConfig";

const AuthForm = ({ variant }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setLoggedInUser(JSON.stringify(currentUser)));
    });

    return unSubscribe;
  }, []);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUpWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      dispatch(setLoggedInUser(JSON.stringify(userCredential.user)));
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log(JSON.stringify(userCredential.user));
      dispatch(setLoggedInUser(JSON.stringify(userCredential.user)));
    } catch (error) {
      console.log(error.message);
    }
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
              clickHandler={
                variant === "signUp" ? signUpWithEmail : signInWithEmail
              }
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
