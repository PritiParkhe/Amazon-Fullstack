import React, { useState, useContext } from "react";
import { FaBars, FaTimes, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import amazonLogo from "../../assets/footerLogo.png";
import Role from "../../services/userRole";
import Context from "../../context";
import { setUserDetails } from "../../stores/userSlice";
import AllApiUrls from "../../services";

const MobileHeader = () => {
  const user = useSelector((state) => state?.user?.user);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1]);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
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

  return (
    <header className="bg-[#232f3e] text-white">
      <nav className="flex flex-col items-center justify-between p-4 space-y-2">
        <div className="flex items-center justify-between w-full">
          <img src={amazonLogo} alt="Amazon Logo" className="h-12 " />
          <div className="flex items-center space-x-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleMenu}
            >
              {sidebarOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </div>
            {user?._id && (
              <div
                className="relative flex items-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                <div className="text-3xl cursor-pointer">
                  {user?.profileImage ? (
                    <img
                      src={user?.profileImage}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </div>
                {menuDisplay && (
                  <div className="absolute bg-white text-black top-full mt-2 shadow-lg rounded p-2">
                    <nav>
                      {user?.role === Role.ADMIN && (
                        <Link
                          to={"/admin-panel/all-products"}
                          className=" whitespace-nowrap hidden md:block hover:bg-gray-200 p-2"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link to="/order" className="block hover:bg-gray-200 p-2">
                        Orders
                      </Link>
                    </nav>
                  </div>
                )}
              </div>
            )}
            <div className="text-2xl flex items-center relative">
              <Link to="/cartproducts" className="text-3xl">
                <FiShoppingCart />
              </Link>
              {user?._id && (
                <div className="text-[#f08804] w-5 h-5 rounded-full absolute -top-2 -right-2 flex items-center justify-center bg-white">
                  <p className="text-xs">{context?.countCartProduct}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center w-full">
            <select className="text-black h-10 rounded-l-md px-2">
              <option value="">All</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-2 h-10 text-black "
              onChange={handleSearch}
              value={search}
            />
            <div className="text-lg min-w-[35px] h-10 bg-[#febd68] flex items-center justify-center rounded-r-md">
              <FaSearch />
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm p-1 w-full justify-center">
          <FaMapMarkerAlt />
          <div className="ml-1">
            <p>Deliver to India</p>
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleMenu}
          ></div>
          <div className="fixed top-0 left-0 min-w-[320px] h-full bg-white text-black z-20 shadow-lg">
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
    </header>
  );
};

export default MobileHeader;
