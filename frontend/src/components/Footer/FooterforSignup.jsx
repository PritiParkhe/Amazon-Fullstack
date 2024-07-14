import React from "react";

const FooterforSignup = () => {
  return (
    <div className="h-40 flex flex-col items-center justify-center text-xs bottom-0  bg-white">
      <div className="pages flex space-x-4 pt-6">
        <p className="hover:underline">Conditions</p>
        <p className="hover:underline">Privacy Notice</p>
        <p className="hover:underline">Your Add Privacy Choices</p>
      </div>
      <div className="copyright pt-2">
        &copy; 1996-2023, Amazon.com, Inc. or its affiliates
      </div>
    </div>
  );
};

export default FooterforSignup;
