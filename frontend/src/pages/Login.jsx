import React from "react";
import LoginForm from "../components/Login.jsx";
import FooterforSignup from "../components/Footer/FooterforSignup.jsx";
const Login = () => {
  return (
    <>
      <div className="bg-white">
        <LoginForm />
        <FooterforSignup />
      </div>
    </>
  );
};

export default Login;
