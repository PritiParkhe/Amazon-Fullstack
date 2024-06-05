import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import Role from '../services/userRole';
import AllApiUrls from '../services';
import { toast } from 'react-toastify';

function ChangeUserRole({ name, email, role, userId, onClose, onUpdateSuccess }) {
  const [userRole, setUserRole] = useState(role);
  
  const updateUserRole = async () => {
    try {
      const response = await fetch(AllApiUrls.updateUser.url, {
        method: AllApiUrls.updateUser.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          userId: userId,
          role: userRole 
        })
      });

      const dataResponse = await response.json();
      
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        onClose();
        onUpdateSuccess();
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Error updating role");
    }
  };

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  return (
    <div className='fixed inset-0 w-full h-full z-10 flex justify-center items-center bg-gray-300 bg-opacity-50'>
      <div className='bg-white shadow-md p-6 w-full max-w-md rounded'>
        <button className='block ml-auto mb-4' onClick={onClose}>
          <MdClose className='text-xl' />
        </button>
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className='flex items-center justify-between my-4'>
          <p>Role:</p>
          <select className='border px-4 py-1 bg-white' value={userRole} onChange={handleOnChangeSelect}>
            {Object.values(Role).map(user => (
              <option value={user} key={user}>{user}</option>
            ))}
          </select>
        </div>
        <button 
          className='w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-700'
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
