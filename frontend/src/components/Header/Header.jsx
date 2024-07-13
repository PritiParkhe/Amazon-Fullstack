import React, { useContext, useState } from "react";
import amazonLogo from "../../assets/Logo.jpg";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Role from "../../services/userRole";
import Context from "../../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1]);

  console.log(searchInput?.search.split("=")[1]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header>
      <nav
        id="navbar"
        className="flex items-center justify-evenly h-16 bg-[#0f1111] text-white  "
      >
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
        <div className="flex items-center w-full justify-between max-w-2xl  ">
          <select className="text-black h-10  rounded-l-md px-1">
            <option value="">All</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-2 h-10 text-black"
            onChange={handleSearch}
            value={search} // <-- Here
          />

          <div className="text-lg min-w-[35px] h-10 bg-[#febd68] flex items-center justify-center rounded-r-md">
            <FaSearch />
          </div>
        </div>

        <div className="text-center hover:border-white hover:border p-1">
          <p>
            <span className="text-xs">Hello, Sign in</span>
          </p>
          <p className="text-sm font-bold">Account & List</p>
        </div>
        <div className="text-center hover:border-white hover:border p-1">
          <p>
            <span className="text-xs">Returns</span>
          </p>
          <p className="text-sm font-bold">& Orders</p>
        </div>
        {user?._id && (
          <div
            className="relative flex  justify-center "
            onClick={() => setMenuDisplay((prev) => !prev)}
          >
            <div className="text-3xl cursor-pointer">
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
            {menuDisplay && (
              <div className="absolute bg-white text-black bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {user?.role === Role.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className=" whitespace-nowrap hidden md:block hover:bg-gray-200 p-2"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to={"/order"}
                    className=" whitespace-nowrap hidden md:block hover:bg-gray-200 p-2"
                  >
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>
        )}

        <div
          className="text-2xl flex items-center p-1 relative"
          id="navCartIcon"
        >
          <Link to={"/cartproducts"} className="text-3xl">
            <FiShoppingCart />
          </Link>
          {user?._id && (
            <div className="text-[#f08804] p-1 w-5 h-5 rounded-full absolute -top-2 -right-3 ">
              <p className="text-xs ">{context?.countCartProduct}</p>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
