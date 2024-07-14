import React from "react";
import { useMediaQuery } from "react-responsive";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const MainHeader = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default MainHeader;
