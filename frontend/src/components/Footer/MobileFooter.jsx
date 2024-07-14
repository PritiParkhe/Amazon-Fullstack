import React from 'react';

const MobileFooter = () => {
  return (
    <footer className="mt-4">
      <div className="bg-[#37475a] text-white h-12 flex justify-center items-center text-sm cursor-pointer">
        <a href="#navbar">Back To Top</a>
      </div>
      <div className="bg-[#232f3e] text-white py-5 ">
        <div className="container mx-auto flex flex-wrap justify-evenly text-sm ml-2">
          <div className="w-full flex flex-wrap justify-between">
            <div className="w-1/2 flex flex-col items-start mb-4">
              <div className="mb-2 hover:underline">Your Amazon.in</div>
              <div className="mb-2 hover:underline">Amazon Pay</div>
              <div className="mb-2 hover:underline">Your Lists</div>
              <div className="mb-2 hover:underline">Your Recently Viewed Items</div>
              <div className="mb-2 hover:underline">Recalls and Product Safety Alerts</div>
              <div className="mb-2 hover:underline">Customer Service</div>
            </div>
            <div className="w-1/2 flex flex-col items-start">
              <div className="mb-2 hover:underline">Your Orders</div>
              <div className="mb-2 hover:underline">Amazon App Download</div>
              <div className="mb-2 hover:underline">Your Account</div>
              <div className="mb-2 hover:underline">Returns</div>
              <div className="mb-2 hover:underline">Sell</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-white text-xs flex flex-col items-center py-4">
        <div className="flex flex-wrap justify-center space-x-4 pt-2">
          <p className="hover:underline">Conditions</p>
          <p className="hover:underline">Privacy Notice</p>
          <p className="hover:underline">Your Ad Privacy Choices</p>
        </div>
        <div className="pt-2">
          &copy; 1996-2023, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
}

export default MobileFooter;
