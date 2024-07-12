import React from 'react'
import SUCCESSIMAGE from "../assets/cancel.png";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-white w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded fixed top-0 bottom-0 left-0 right-0 z-50 overflow-auto">
      <div className="bg-white w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
        <img src={SUCCESSIMAGE} alt="Success" width={150} height={150} />
        <p className="text-red-600 font-bold text-xl mt-4">Payment Cancel</p>
        <Link
          to={"/cartproducts"}
          className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white"
        >
          Go to cart
        </Link>
      </div>
    </div>
  );
}

export default Cancel