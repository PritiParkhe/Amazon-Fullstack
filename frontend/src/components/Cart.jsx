import React, { useContext, useEffect, useState } from "react";
import Header from "./Header/Header";
import SmallHerosection from "./Header/SmallHerosection";
import AllApiUrls from "../services";
import displayINRCurrency from "../services/displayCurrency";
import Context from "../context";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(Context);
  const navigate = useNavigate();

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
      console.log("Fetched cart products:", responseData);

      if (responseData.success) {
        const mergedData = responseData.data.reduce((acc, product) => {
          const existingProduct = acc.find(
            (p) => p.productId._id === product.productId._id
          );
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

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const increaseQty = async (id, qty) => {
    const response = await fetch(AllApiUrls.updateCartProduct.url, {
      method: AllApiUrls.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchCartProducts();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(AllApiUrls.updateCartProduct.url, {
        method: AllApiUrls.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchCartProducts();
      }
    }
  };

  const handleDelete = async (productId) => {
    console.log("Deleting product:", productId);
    try {
      const response = await fetch(AllApiUrls.deleteCartProducts.url, {
        method: AllApiUrls.deleteCartProducts.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: productId,
        }),
      });
      const responseData = await response.json();
      console.log("Delete response:", responseData);
      if (responseData.success) {
        fetchCartProducts();
      } else {
        console.error("Failed to delete product:", responseData.message);
        setError("Failed to delete product");
      }
    } catch (error) {
      console.error("An error occurred while deleting product:", error);
      setError("An error occurred while deleting product");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

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
                  {data.map((product, index) => (
                    <div
                      key={product._id || index}
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
                              onClick={() =>
                                decraseQty(product?._id, product?.quantity)
                              }
                            >
                              -
                            </button>
                            <span>{product?.quantity}</span>
                            <button
                              className="border hover:border-black w-6 h-6"
                              onClick={() =>
                                increaseQty(product?._id, product?.quantity)
                              }
                            >
                              +
                            </button>
                            <div className="flex items-center">
                              <button
                                className="ml-4 text-[#007185] text-sm "
                                onClick={() => handleDelete(product._id)}
                              >
                                Delete <span className="ml-2"> |</span>
                              </button>
                              <button className="ml-2 text-[#007185] text-sm">
                                See More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 lg:ml-4 flex flex-col items-center justify-center h-48 lg:flex-none lg:w-1/4">
                <>
                  <p className="text-lg">
                    <strong>Subtotal: {displayINRCurrency(totalPrice)}</strong>
                  </p>
                  <div className="flex items-center mt-2">
                    <input type="checkbox" />
                    <span className="ml-2">This order contains a gift.</span>
                  </div>
                </>
                <button
                  className="w-3/4 mt-4 bg-yellow-400 py-2 rounded-lg"
                  onClick={handleCheckout}
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
