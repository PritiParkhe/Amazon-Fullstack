import React from 'react';
import Herosection from './Herosection';
import { useMediaQuery } from "react-responsive";
import MobileHerosection from './MobileHerosection';

const MainHeroSection = () =>  {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
      {isMobile  ? <MobileHerosection />: <Herosection />  }
    </>
  );
}

export default MainHeroSection;


