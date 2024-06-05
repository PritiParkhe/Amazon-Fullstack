import React, { useEffect } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import AdminPanelComponent from '../components/AdminPanel'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Role from '../services/userRole';
const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if (user?.role!== Role.ADMIN) {
      navigate("/")
      
    }
  },[user])
  return (
    <>
      <Header/>
      <div className='min-h-[calc(100vh-120px)] md:flex hidden '>
      <aside className='bg-white min-h-full w-full max-w-60 shadow-lg'>
        <div className='h-32  flex justify-center items-center flex-col'>
          <div className='text-4xl cursor-pointer relative flex justify-center mt-5'>
                      {user?.profileImage ? (
                      <img 
                          src={user?.profileImage}
                          alt={user?.name}
                          className='w-20 h-20 rounded-full'
                      />
                      ) : (
                          <FaRegCircleUser />
                      )}
          </div>
          <p className=' capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>
        <div >
          {/* navigation */}
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-gray-200 hover:rounded '>All Users</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-gray-200 hover:rounded '>All Products</Link>
          </nav>
        </div>

      </aside>
      <main className='w-full h-full p-2'>
        <Outlet/>
      </main>
    </div>
      <Footer/>
    </>
  )
}

export default AdminPanel