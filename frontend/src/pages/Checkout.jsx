import React, { useState, useEffect } from "react";
import AllApiUrls from "../services";
import displayINRCurrency from "../services/displayCurrency";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);

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

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );
    const response = await fetch(AllApiUrls.payment.url, {
      method: AllApiUrls.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const responseData = await response.json();

    if (responseData?.id) {
      const { error } = await stripePromise.redirectToCheckout({
        sessionId: responseData.id,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
      }
    }

    console.log("payment response", responseData);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <h1 className="font-semibold text-center text-2xl mb-6 bg-gray-100 p-4">
        Checkout
      </h1>
      <div className="container mx-auto p-6">
        <div className="flex justify-center mx-14 gap-4 ">
          <div className="w-3/5 bg-white p-6 rounded ">
            <h3 className="text-xl font-semibold mb-4">
              1. Select a payment method
            </h3>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-lg mb-4">Add a payment method</h4>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  className="mr-4"
                  onChange={() => setIsPaymentMethodSelected(true)}
                />
                <label>Credit/Debit Card</label>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">
              2. Review items and delivery
            </h3>
            <div className="border border-gray-300 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-4">Your Items</h4>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                data.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex items-center mb-4"
                  >
                    <img
                      src={item.productId.productImage[0]}
                      alt={item.productId.name}
                      className="w-16 h-16 object-cover mr-4"
                    />

                    <div className="flex-1">
                      <h5 className="font-semibold">{item.productId.title}</h5>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">
                      {displayINRCurrency(item.productId.sellingPrice)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="w-1/5 bg-white p-6 rounded border border-gray-300 h-1/3">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="mb-4">
              <p>
                Items:{" "}
                <span className="float-right">
                  {displayINRCurrency(
                    data.reduce(
                      (acc, item) =>
                        acc + item.productId.sellingPrice * item.quantity,
                      0
                    )
                  )}
                </span>
              </p>
              <p>
                Shipping: <span className="float-right">₹50</span>
              </p>
              <p className="font-bold">
                Total:{" "}
                <span className="float-right">
                  {displayINRCurrency(
                    data.reduce(
                      (acc, item) =>
                        acc + item.productId.sellingPrice * item.quantity,
                      0
                    ) + 80
                  )}
                </span>
              </p>
            </div>
            <button
              className="w-full bg-yellow-400 rounded-full px-4 py-2 font-bold"
              onClick={handlePayment}
              disabled={!isPaymentMethodSelected}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
