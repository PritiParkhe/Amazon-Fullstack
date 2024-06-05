import React, { useState } from 'react';
import Logo from "../assets/Form_Logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginIcon from '../assets/LoginIcon.gif';
import { imagetobase64 } from '../Helper/Image.js';
import { Link, useNavigate } from 'react-router-dom';
import AllApiUrls from '../services/index.js';
import { toast } from 'react-toastify';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: ''
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUploadImg = async (e) => {
    const file = e.target.files[0];
    const image = await imagetobase64(file);
    setFormData((prev) => ({
      ...prev,
      profileImage: image
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    
    try {
      const response = await fetch(AllApiUrls.signUp.url, {
        method: AllApiUrls.signUp.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
      const data = await response.json();
      if (data.success) {
        toast.success(data.message)
        navigate("/login")
      }
      if(data.error){
        toast.error(data.message)
      }

    } catch (error) {
      console.error('Failed to fetch:', error.message);
    }
  };

  return (
    <>
      <div className='w-2/4 min-w-[450px] h-fit p-2 m-auto flex flex-col items-center '>
        <img src={Logo} alt='' className='h-16 mb-2 ' />
        <form onSubmit={handleSubmit} className='border border-lightgray w-3/5 h-400 flex flex-col items-center justify-center p-4'>
          <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
            <div>
              <img src={formData.profileImage || LoginIcon} alt="" />
            </div>
            <label>
              <div className='text-xs bg-opacity-80 pb-4 pt-2 bg-gray-100 py-4 text-center absolute bottom-0 w-full cursor-pointer'>
                Upload photo
              </div>
              <input type="file" className='hidden' onChange={handleUploadImg} />
            </label>
          </div>

          <div className='w-full p-2 gap-4'>
            <label>Name</label>
            <input
              className='w-full p-2 border border-gray-300 rounded mb-5'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='John Smith'
            />
            <label>Email</label>
            <input
              className='w-full p-2 border border-gray-300 rounded mb-5'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='example@example.com'
            />
            <label>Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                name="password"
                value={formData.password}
                onChange={handleChange}
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

            <button className='h-9 w-full mt-3 px-4 bg-yellow-500 border-none outline-none rounded-md mb-5 hover:bg-gray-200 border border-gray-300' onClick={handleSubmit}>Create Account in Amazon</button>
            <p className='text-xs w-full text-center mb-5'>
              By continuing, you agree to Amazon's
              <span className='text-blue-600'> Conditions of Use </span>and
              <span className='text-blue-600'> Privacy Notice </span>
            </p>
          </div>
        </form>
        <Link to={'/login'} className='w-40 mt-3 h-9 bg-yellow-500 border-none outline-none rounded-lg hover:bg-gray-200 border border-gray-300 flex items-center justify-center'> Back to Login</Link>
      </div>
    </>
  );
}

export default Signup;
