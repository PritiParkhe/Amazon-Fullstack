import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Form_Logo.jpg'
import AllApiUrls from '../services';
import { toast } from 'react-toastify';
import Context from '../context';



function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate()
  const {fetchUserInfo} = useContext(Context)
  

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(AllApiUrls.signIn.url, {
        method: AllApiUrls.signIn.method,
        credentials : 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.message}`
        );
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        navigate('/');
        fetchUserInfo()
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Failed to fetch:', error.message);
      toast.error('Failed to fetch: ' + error.message);
    }
  };
  

  

  return (
    <>
    <div className="w-2/5 min-w-[450px] h-fit p-4 m-auto flex flex-col items-center">
      <div className="mb-5">
        <img src={Logo} alt="" className="h-16" />
      </div>

      <form onSubmit={handleSubmit} className="border border-lightgray w-3/5 h-[400px] flex flex-col items-center justify-center p-4">
        <h3 className="mb-4">Sign In</h3>

        <div className="w-full p-2">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="example@example.com"
            name="email"
            value={formData.email} 
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
              value={formData.password}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded pr-10"
              required
              autoComplete=''
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

        <button type="submit" className="w-3/5 h-9 bg-yellow-500 border-none outline-none rounded-lg mt-8" onClick={handleSubmit}>
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
    
    </>
  );
}

export default Login;

