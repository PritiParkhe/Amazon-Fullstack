import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileFooter from "./MobileFooter";
import Footer from "./Footer";


const MainFooter = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return isMobile ? <MobileFooter/> : <Footer />;
};

export default MainFooter;
