import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import AllApiUrls from '../services';
import ChangeUserRole from '../components/ChangeUserRole';

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(false);
  const [updateSelectedUserRole,setUpdateSelectedUserRole] = useState({
    email : '',
    name : '',
    role : '',
    _id : ''
  })

  const getAllUsers = async () => {
    try {
      const response = await fetch(AllApiUrls.allUser.url, {
        method: AllApiUrls.allUser.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
        
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users');
    }
  };

  useEffect(() => {
    getAllUsers();
    

    
  }, []);

  

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="w-full bg-slate-100 rounded-lg shadow-md border-white border-4">
          <thead>
            <tr>
              <th className="border-white border-2 bg-slate-200 text-center px-4 py-2">Sr.</th>
              <th className="border-white border-2 bg-slate-200 text-center px-4 py-2">Name</th>
              <th className="border-white border-2 bg-slate-200 text-center px-4 py-2">Email</th>
              <th className="border-white border-2 bg-slate-200 text-center px-4 py-2">Role</th>
              <th className="border-white border-2 bg-slate-200 text-center px-4 py-2">Created Date</th>
              <th className="border-white border-2 bg-slate-200 text-center px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id}  className="hover:bg-slate-50">
                <td className="border-white border-2 text-center px-4 py-2">{index + 1}</td>
                <td className="border-white border-2 text-center px-4 py-2">{user.name}</td>
                <td className="border-white border-2 text-center px-4 py-2 text-blue-700">{user.email}</td>
                <td className="border-white border-2 text-center px-4 py-2">{user.role}</td>
                <td className="border-white border-2 text-center px-4 py-2">{moment(user?.createdAt).format('ll')}</td>
                <td className="border-white border-2 text-center px-4 py-2">
                  <button 
                    className='bg-slate-300 p-2 rounded-full cursor-pointer hover:bg-blue-100' 
                    onClick={() => {setSelectedUser(true)
                      setUpdateSelectedUserRole(user)}
                    }
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
      <ChangeUserRole 
        name={updateSelectedUserRole.name} 
        email={updateSelectedUserRole.email} 
        role={updateSelectedUserRole.role} 
        userId={updateSelectedUserRole._id}
        onClose={() => setSelectedUser(false)}
        onUpdateSuccess={getAllUsers} // Pass the callbgack function

      />
    )}
    </div>
  );
}

export default AllUsers;
