import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Herosection from "./components/Header/Herosection";

export default function App() {
  return (
    <>
      <Header/>
      <main>
      <Herosection/>
      <Outlet/>
      </main>
      <Footer/>
    </>
  )
}