import React, { useEffect } from "react";
import AuthForm from "components/AuthForm";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "store/features/auth/authSlice";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "configs/firbaseConfig";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setLoggedInUser(JSON.stringify(currentUser)));

      if (currentUser && currentUser.uid) {
        navigate("/");
      }
    });

    return unSubscribe;
  }, []);

  return (
    <div className="container">
      <section className="section">
        <AuthForm variant="signUp" />
      </section>
    </div>
  );
};

export default SignUp;
