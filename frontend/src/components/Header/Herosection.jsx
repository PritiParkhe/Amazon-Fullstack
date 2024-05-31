import React, { useState } from 'react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Hero from "../../assets/hero.jpg";

function Herosection() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="h-10 bg-[#232f3e] text-white flex items-center justify-evenly">
        <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          <span className="font-bold text-sm pl-2">All</span>
        </div>
        <div className="flex-grow text-white text-10px flex justify-around">
          <p>Amazon MiniTV</p>
          <p>Sell</p>
          <p>Best Seller</p>
          <p>Mobiles</p>
          <p>Today's Deals</p>
          <p>Electronics</p>
          <p>Primes</p>
          <p>Fashion</p>
          <p>Customer Service</p>
          <p>Home & Kitchen</p>
          <p>New Releases</p>
          <p>Amazon Pay</p>
          <p>Computers</p>
          <p>Gift Ideas</p>
          <p>Books</p>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={toggleMenu}></div>
          <div className="fixed top-0 left-0 min-w-[365px] h-full bg-white text-black z-20 shadow-lg">
            <div className="bg-[#232f3e] h-12 flex items-center justify-between mb-4 px-4 text-white">
              <FaUser />
              <Link to={"/login"} className="ml-2 font-bold" onClick={toggleMenu}>Hello, sign in</Link>
              <FaTimes className="cursor-pointer" onClick={toggleMenu} />
            </div>
            <ul>
              <li>Sign Out</li>
            </ul>
          </div>
        </>
      )}

      <div>
        <img src={Hero} alt="Hero" className='w-full' />
        <div className='bg-white text-black h-[40px] flex items-center justify-center text-sm mb-6'>
          <p>You are on amazon.com. You can also shop on Amazon India for millions of products with fast local delivery</p>
        </div>
      </div>
    </>
  );
}

export default Herosection
