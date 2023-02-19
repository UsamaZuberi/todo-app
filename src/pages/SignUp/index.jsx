import React from "react";
import AuthForm from "components/AuthForm";

const SignUp = () => {
  return (
    <div className="container">
      <section className="section">
        <AuthForm variant="signUp" />
      </section>
    </div>
  );
};

export default SignUp;
