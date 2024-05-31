import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.jpg'

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  console.log("data login", data);

  return (
    <div className="w-2/5 min-w-[450px] h-fit p-4 m-auto flex flex-col items-center">
      <div className="mb-5">
        <img src={Logo} alt="" className="w-14" />
      </div>

      <form onSubmit={handleSubmit} className="border border-lightgray w-3/5 h-[400px] flex flex-col items-center justify-center p-4">
        <h3 className="mb-4">Sign In</h3>

        <div className="w-full p-2">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="example@example.com"
            name="email"
            value={data.email} 
            onChange={handleOnChange}
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>

        <div className="w-full p-2 relative">
          <label>Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded pr-10"
              required
            />
            <div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div> 
          <Link to={"/forgot-password"} className="block w-fit ml-auto hover:underline hover:text-yellow-600">
            Forgot Password
          </Link>
        </div>

        <button type="submit" className="w-3/5 h-9 bg-yellow-500 border-none outline-none rounded-lg mt-8">
          Login
        </button>

        <div className="text-xs w-full mt-5 text-center">
          By continuing, you agree to Amazon's 
          <span className="text-blue-600"> Conditions of Use </span> and
          <span className="text-blue-600"> Privacy Notice </span>
        </div>
      </form>

      <Link to={"/sign-up"} className="w-3/5 h-9 text-xs mt-5 hover:bg-gray-300 border border-gray-300 flex items-center justify-center">
        Create Account in Amazon
      </Link>
    </div>
  );
}

export default Login;
