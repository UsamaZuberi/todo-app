import React from "react";
import AuthForm from "components/AuthForm";

const SignIn = () => {
  return (
    <div className="container">
        <section className="section">
          <AuthForm variant="signIn"/>
        </section>
    </div>
  );
};

export default SignIn;
