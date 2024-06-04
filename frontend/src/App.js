import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllApiUrls from "./services";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./stores/userSlice";

export default function App() {
  const dispatch = useDispatch()

  const fetchUserInfo = async()=>{
    const response = await fetch (AllApiUrls.user.url,{
      method : AllApiUrls.user.method,
      credentials : 'include'
    })
    const dataResponse =  await response.json()

    if(dataResponse.success){
      dispatch(setUserDetails(dataResponse.data))
    }

    console.log("userdata",response);
  }
  useEffect(()=>{
    /* user Information*/
    fetchUserInfo()
    })
  return (
    <>
      <Context.Provider value={{
        fetchUserInfo // userInfo feching
      }}>
      <ToastContainer />
      <main>
      <Outlet/>
      </main>
      </Context.Provider>
      
    </>
  )
}