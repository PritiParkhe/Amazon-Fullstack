import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import AllApiUrls from "../../services";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../stores/userSlice";
import { useMediaQuery } from "react-responsive";

const SmallHerosection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleUserLogout = async () => {
    const response = await fetch(AllApiUrls.logout.url, {
      method: AllApiUrls.logout.method,
      credentials: "include",
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
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  // Use useMediaQuery to check for mobile screen (max-width: 768px)
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Render null if it's mobile
  if (isMobile) {
    return null;
  }

  // Render SmallHerosection for non-mobile screens (laptops)
  return (
    <>
      <div className="h-10 bg-[#232f3e] text-white flex items-center justify-evenly">
        <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
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
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleMenu}
          ></div>
          <div className="fixed top-0 left-0 min-w-[365px] h-full bg-white text-black z-20 shadow-lg">
            <div className="bg-[#232f3e] h-12 flex items-center justify-between mb-4 px-4 text-white">
              <div
                className="text-3xl cursor-pointer"
                onClick={handleProfileClick}
              >
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
              <Link
                to={"/login"}
                className="ml-2 font-bold"
                onClick={toggleMenu}
              >
                Hello, sign in
              </Link>
              <FaTimes className="cursor-pointer" onClick={toggleMenu} />
            </div>
            <ul>
              {user?._id ? (
                <button onClick={handleUserLogout}>Sign Out</button>
              ) : (
                <Link to={"/login"}>Sign In</Link>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default SmallHerosection;
