import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
import AllApiUrls from '../../services';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../stores/userSlice';
import Banner1 from '../../assets/banner1.jpg';
import Banner2 from '../../assets/banner2.jpg';
import Banner3 from '../../assets/banner3.jpg';
import Banner4 from '../../assets/banner4.jpg';
import Banner5 from '../../assets/banner5.jpg';
import Banner6 from '../../assets/banner6.jpg';
import Banner7 from '../../assets/banner7.jpg';
import Banner8 from '../../assets/banner8.jpg';

function Herosection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);
  const bannerCorousel = [
    Banner1,
    Banner2,
    Banner3,
    Banner4,
    Banner5,
    Banner6,
    Banner7,
    Banner8,
  ];

  const nextImg = () => {
    if (bannerCorousel.length - 1 > currentImg) {
      setCurrentImg((prev) => prev + 1);
    }
  };

  const prevImg = () => {
    if (currentImg !== 0) {
      setCurrentImg((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (bannerCorousel.length - 1 > currentImg) {
        nextImg();
      } else {
        setCurrentImg(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImg, bannerCorousel.length, nextImg]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUserLogout = async () => {
    const response = await fetch(AllApiUrls.logout.url, {
      method: AllApiUrls.logout.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/user');
    } else {
      navigate('/login');
    }
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
              <div className="text-3xl cursor-pointer" onClick={handleProfileClick}>
                {user?.profileImage ? (
                  <img
                    src={user?.profileImage}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
              <Link to={"/login"} className="ml-2 font-bold" onClick={toggleMenu}>Hello, sign in</Link>
              <FaTimes className="cursor-pointer" onClick={toggleMenu} />
            </div>
            <ul>
              {user?._id ? (
                <button onClick={handleUserLogout}>Sign Out</button>
              ) : (
                <Link to={'/login'}>Sign In</Link>
              )}
            </ul>
          </div>
        </>
      )}

      <div className="container mx-auto px-4">
        <div className="relative h-screen w-full bg-gray-200 overflow-hidden">
          <div className="absolute z-10 h-full w-full flex items-center justify-between text-4xl text-white">
            <button className="py-16 px-3 hover:border border-[#007185]" onClick={prevImg}>
              <TfiAngleLeft />
            </button>
            <button className="py-16 px-3 hover:border border-[#007185]" onClick={nextImg}>
              <TfiAngleRight />
            </button>
          </div>
          <div className="flex h-full w-full">
            {bannerCorousel.map((banner, index) => (
              <div
                className="h-full w-full min-w-full transition-transform duration-700"
                key={banner}
                style={{ transform: `translateX(-${currentImg * 100}%)` }}
              >
                <img src={banner} alt={`Banner ${index}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Herosection;
