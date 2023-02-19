import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import Todo from "components/Todo";
import Button from "components/Button";

// Redux
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "store/features/auth/authSlice";

// Firebase
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "configs/firbaseConfig";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setLoggedInUser(JSON.stringify(currentUser)));

      if (!(currentUser && currentUser.uid)) {
        navigate("/sign-in");
      }
    });

    return unSubscribe;
  }, []);

  return (
    <div className="container">
      <div className={styles.topBar}>
        <div className={styles.topBar__button}>
          <Button type="button" title="Logout" clickHandler={logout} />
        </div>
      </div>

      <section className="section">
        <Todo />
      </section>
    </div>
  );
};

export default Home;
