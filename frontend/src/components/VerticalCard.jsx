import React, { useContext } from "react";
import { Link } from "react-router-dom";
import displayINRCurrency from "../services/displayCurrency";
import addToCard from "../Helper/addToCard.js";
import Context from "../context";

const VerticalCard = ({ products = [], heading }) => {
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCard(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative p-4 rounded-md bg-white shadow-md mt-2">
        <h2 className="text-xl font-bold mb-4">{heading}</h2>
        <div className="flex flex-wrap ">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-2"
              >
                <div className="bg-white rounded-sm shadow p-4 flex flex-col h-full min-h-[350px]">
                  <Link
                    to={`/product/${product._id}`}
                    className="bg-white h-48 flex justify-center items-center mb-2"
                  >
                    <img
                      src={product.productImage[0]}
                      alt={product.title}
                      className="object-contain h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </Link>
                  <div className="flex-1">
                    <h2 className="font-medium text-lg text-black">
                      {product.title}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product.brandName}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="font-medium text-lg">
                        {displayINRCurrency(product.sellingPrice)}
                      </p>
                      <p className="text-gray-500 line-through">
                        {displayINRCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    className="mt-4 w-2/3 bg-[#ffd814] px-3 py-2 rounded-full self-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mx-4">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
