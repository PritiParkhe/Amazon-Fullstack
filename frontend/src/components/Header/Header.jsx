import React from 'react';
import amazonLogo from "../../assets/Logo.jpg"; // Ensure this is the correct path
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import {FaRegCircleUser} from "react-icons/fa6"

const Header = () => {
    return (
        <header>
            <nav id='navbar' className="flex items-center justify-evenly h-16 bg-[#0f1111] text-white  ">
                <div className="flex items-center hover:border-white hover:border">
                    <img src={amazonLogo} alt="Amazon Logo" className="h-14 w-36" />
                </div>
                <div className="ml-4 text-base hover:border-white hover:border p-1">
                    <p>Deliver to</p>
                    <div className="flex items-center">
                        <FaMapMarkerAlt />
                        <p className="ml-1 text-base">India</p>
                    </div>
                </div>
                <div className='flex items-center w-full justify-between max-w-2xl  '>
                    <select className="text-black h-10  rounded-l-md px-1">
                        <option value="" >All</option>
                    </select>
                    <input type="text" placeholder='Search'className='w-full  pl-2 h-10' />
                    <div className='text-lg min-w-[35px] h-10 bg-[#febd68] flex items-center justify-center rounded-r-md'>
                        <FaSearch/>
                    </div>  
                </div>
                
                <div className="text-center hover:border-white hover:border p-1">
                    <p><span className="text-xs">Hello, Sign in</span></p>
                    <p className="text-sm font-bold">Account & List</p>
                </div>
                <div className="text-center hover:border-white hover:border p-1">
                    <p><span className="text-xs">Returns</span></p>
                    <p className="text-sm font-bold">& Orders</p>
                </div>
                <div className="text-2xl flex items-center p-1 relative" id="navCartIcon">
                    <span className='text-3xl'><FiShoppingCart /></span>
                    <div className='text-[#f08804] p-1 w-5 h-5 rounded-full absolute -top-2 -right-3 '>
                        <p className='text-xs '>0</p>
                    </div>     
                </div>
                <div className='text-3xl cursor-pointer'>
                    <FaRegCircleUser/>
                </div>
            </nav>
        </header>

    );
};

export default Header;
