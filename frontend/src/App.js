import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllApiUrls from "./services";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./stores/userSlice";

export default function App() {
  const dispatch = useDispatch();
  const [countCartProduct, setCountCartProduct] = useState(0);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(AllApiUrls.user.url, {
        method: AllApiUrls.user.method,
        credentials: "include",
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        dispatch(setUserDetails(dataResponse.data));
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(AllApiUrls.countCartProduct.url, {
        method: AllApiUrls.countCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      setCountCartProduct(responseData.data.count)
      if (responseData.success) {
        dispatch(setUserDetails(responseData.data?.count));
      }
    } catch (error) {
      console.error("Error fetching user cart details:", error);
    }
  };

  useEffect(() => {
    /* Fetch user information */
    fetchUserInfo();
    /* Fetch user product cart details */
    fetchUserAddToCart();
  }, [fetchUserAddToCart]);

  return (
    <>
      <Context.Provider value={{ fetchUserInfo,
        countCartProduct, // add to cat product function
        fetchUserAddToCart
       }}>
        <ToastContainer />
        <main>
          <Outlet />
        </main>
      </Context.Provider>
    </>
  );
}
