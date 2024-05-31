import React from 'react';
import Logo from "../../assets/Logo.jpg"
const Footer = () => {
  const panels = [
    {
      title: "Get to know Us",
      links: ["Careers", "Blog", "About Amazon", "Amazon Devices", "Amazon Science"]
    },
    {
      title: "Make Money with Us",
      links: ["Sell on Amazon", "Amazon Associates", "Sell on Amazon Handmade", "Advertise Your Products", "Self-Publish with Us"]
    },
    {
      title: "Amazon Payment Products",
      links: ["Amazon Rewards Visa", "Amazon Store Card", "Amazon Secured Card", "Amazon Business Card", "Amazon Corporate Card"]
    },
    {
      title: "Let Us Help You",
      links: ["Your Account", "Your Orders", "Shipping Rates", "Amazon Prime", "Returns & Replacements"]
    }
  ];

  return (
    <footer className="mt-4">
      <div className=" bg-[#37475a] text-white h-12 flex justify-center items-center text-sm cursor-pointer">
        <a href="#navbar"> Back To Top</a>
        </div>
      <div className=" bg-[#232f3e] text-white h-72 flex justify-evenly py-5">
        {panels.map((panel, index) => (
          <div key={index} className="mt-5">
            <p className="font-bold">{panel.title}</p>
            {panel.links.map((link, idx) => (
              <p key={idx} className="block text-sm mt-2 text-gray-400 hover:text-gray-200">{link}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="foot-panel3 bg-[#232f3e] text-white border-t border-white h-18 flex justify-center items-center">
        <div className="bg-no-repeat bg-contain h-12 w-24 mt-4">
          <img src={Logo} alt="Amazon Logo" />
        </div>
      </div>

      <div className="foot-panel4 bg-gray-900 text-white h-24 flex flex-col items-center justify-center text-xs">
        <div className="pages flex space-x-4 pt-6">
          <p className="hover:underline">Conditions</p>
          <p className="hover:underline">Privacy Notice</p>
          <p className="hover:underline">Your Add Privacy Choices</p>
        </div>
        <div className="copyright pt-2">
          &copy; 1996-2023, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
}

export default Footer;
