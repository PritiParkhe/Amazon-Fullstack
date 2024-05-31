import React from 'react';

function Login() {
  return (
    <div className="w-2/5 min-w-[450px] h-fit p-4 m-auto flex flex-col items-center">
      <div className="mb-5">
        <img src="amazon_logo.png" alt="" className="w-30" />
      </div>

      <div className="border border-lightgray w-3/5 h-[400px] flex flex-col items-center justify-center p-4">
        <h3 className="mb-4">Sign In</h3>

        <div className="w-full p-2">
          <p>Email</p>
          <input type="email" placeholder="example@example.com" className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="w-full p-2">
          <p>Password</p>
          <input type="password" placeholder="********" className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <button className="w-3/5 h-9 bg-yellow-500 border-none outline-none rounded-lg mt-8">Login</button>

        <div className="text-xs w-full mt-5 text-center">
          By continuing, you agree to Amazon's 
          <span className="text-blue-600"> Conditions of Use </span>and
          <span className="text-blue-600"> Privacy Notice </span>
        </div>
      </div>

      <button className="w-3/5 h-9 text-xs mt-5 hover:bg-gray-200 border border-gray-300">Create Account in Amazon</button>
    </div>
  );
}

export default Login;
