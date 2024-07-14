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
      <div className='w-full max-w-md p-4 mx-auto flex flex-col items-center'>
        <img src={Logo} alt='Logo' className='h-16 mb-4' />
        <form onSubmit={handleSubmit} className='w-full bg-white p-4 rounded-lg shadow-md'>
          <div className='w-24 h-24 mx-auto relative rounded-full overflow-hidden mb-4'>
            <img src={formData.profileImage || LoginIcon} alt="Profile" className='w-full h-full object-cover' />
            <label className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs cursor-pointer'>
              Upload photo
              <input type="file" className='hidden' onChange={handleUploadImg} />
            </label>
          </div>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Name</label>
              <input
                className='w-full p-2 border border-gray-300 rounded'
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='John Smith'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                className='w-full p-2 border border-gray-300 rounded'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='example@example.com'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                  required
                  autoComplete='new-password'
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='w-full py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition'
            >
              Create Account in Amazon
            </button>
          </div>

          <p className='text-xs text-center mt-4'>
            By continuing, you agree to Amazon's
            <Link to='/terms' className='text-blue-600'> Conditions of Use </Link> and
            <Link to='/privacy' className='text-blue-600'> Privacy Notice</Link>.
          </p>
        </form>

        <Link
          to='/login'
          className='mt-4 w-1/2 text-center py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition'
        >
          Back to Login
        </Link>
      </div>
    </>
  );
}

export default Signup;
