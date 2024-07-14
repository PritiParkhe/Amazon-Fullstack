import React from "react";
import SignupForm from "../components/Signup.jsx";
import FooterforSignup from "../components/Footer/FooterforSignup";
const Signup = () => {
  return (
    <>
      <div className="bg-white">
        <SignupForm />
        <FooterforSignup />
      </div>
    </>
  );
};

export default Signup;
