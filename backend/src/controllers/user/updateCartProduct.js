import React, { useContext, useEffect, useState } from "react";
import Header from "./Header/Header";
import SmallHerosection from "./Header/SmallHerosection";
import AllApiUrls from "../services";
import Context from "../context";
import displayINRCurrency from "../services/displayCurrency";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const context = useContext(Context);

  const fetchCartProducts = async () => {
    try {
      const response = await fetch(AllApiUrls.viewCartProducts.url, {
        method: AllApiUrls.viewCartProducts.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();

      if (responseData.success) {
        // Combine products with the same productId
        const mergedData = responseData.data.reduce((acc, product) => {
          const existingProduct = acc.find(p => p.productId._id === product.productId._id);
          if (existingProduct) {
            existingProduct.quantity += product.quantity;
          } else {
            acc.push(product);
          }
          return acc;
        }, []);

        setData(mergedData);
      } else {
        setError("Failed to fetch cart products");
      }
    } catch (error) {
      setError("An error occurred while fetching cart products");
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdateCartProduct = async (id, qty) => {
    try {
      const response = await fetch(AllApiUrls.updateCartProducts.url, {
        method: AllApiUrls.updateCartProducts.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty
        })
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchCartProducts(); // Re-fetch cart products to update the UI
      } else {
        setError("Failed to update cart product");
      }
    } catch (error) {
      setError("An error occurred while updating cart product");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleDelete = (productId) => {
    setData(data.filter(product => product.productId._id !== productId));
    fetchUpdateCartProduct(productId);
  };

  const handleQuantityChange = (productId, amount) => {
    const product = data.find(p => p.productId._id === productId);
    const newQuantity = product.quantity + amount;
    if (newQuantity > 0) {
      fetchUpdateCartProduct(productId, newQuantity);
    }
  };

  return (
    <>
      <Header />
      <SmallHerosection />
      <div className="container mx-auto border relative my-4 px-4">
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : data.length === 0 ? (
            <div className="bg-white mt-4 shadow-xl p-6 w-[985px] ml-4 ">
              <div className="mb-1">
                <p className="text-3xl">Your Amazon Cart is empty.</p>
              </div>
              <p>
                Your shopping cart is waiting. Give it purpose – fill it with
                groceries, clothing, household supplies, electronics and more.
              </p>
              <p>
                Continue shopping on the{" "}
                <a href="/" className="text-[#007185]">
                  Amazon.in homepage
                </a>
                , learn about today's deals, or visit your Wish List.
              </p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row mt-3 ">
              <div className="flex-1">
                <div className="bg-white p-4 flex-1 mb-4">
                  <h2 className="font-medium border-b border-gray-300 pb-4">
                    Shopping Cart
                  </h2>
                  {data.slice(0, showMore ? data.length : 5).map((product, index) => (
                    <div
                      key={product.id || index}
                      className="flex flex-col lg:flex-row p-1 mt-1 border-b border-gray-200"
                    >
                      <div className="flex items-center mt-4 mb-6">
                        <div className="flex-shrink-0 w-24 h-24 ">
                          <img
                            src={product.productId.productImage[0]}
                            alt={product.productId.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="ml-8 flex-1 ">
                          <h4 className="font-semibold text-xl">
                            {product.productId.title}
                          </h4>
                          <p className="font-semibold mt-2">
                            {product.productId.subCategory}
                          </p>
                          <p className="font-semibold mt-2">
                            {displayINRCurrency(product.productId.sellingPrice)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <button 
                              className="border hover:border-black w-6 h-6"
                              onClick={() => handleQuantityChange(product.productId._id, -1)}
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button 
                              className="border hover:border-black w-6 h-6"
                              onClick={() => handleQuantityChange(product.productId._id, 1)}
                            >
                              +
                            </button>
                            <button
                              className="ml-4 text-[#007185]"
                              onClick={() => handleDelete(product.productId._id)}
                            >
                              Delete
                            </button>
                            <button
                              className="ml-4 text-[#007185]"
                              onClick={() => setShowMore(!showMore)}
                            >
                              See more items
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {data.length > 5 && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="mt-4 text-blue-500"
                    >
                      {showMore ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              </div>
              <div className="bg-white p-4 lg:ml-4 flex flex-col items-center justify-center h-48 lg:flex-none lg:w-1/4">
                <>
                  <p className="text-lg">
                    <strong>
                      Subtotal:{" "}
                      {displayINRCurrency(
                        data.reduce(
                          (acc, product) =>
                            acc + product.productId.sellingPrice * product.quantity,
                          0
                        )
                      )}
                    </strong>
                  </p>
                  <div className="flex items-center mt-2">
                    <input type="checkbox" />
                    <span className="ml-2">This order contains a gift.</span>
                  </div>
                </>
                <button
                  // onClick={() => navigate("/address")}
                  className="w-3/4 mt-4 bg-yellow-400 py-2 rounded-lg"
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;