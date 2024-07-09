import React, { useState, useEffect } from "react";
import AllApiUrls from "../services";

const Checkout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Payment
  const handlePayment = async () => {
    try {
      const response = await fetch(AllApiUrls.payment.url, {
        method: AllApiUrls.payment.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cardItems: data,
        }),
      });
      const responseData = await response.json();
      console.log("Payment response:", responseData);
    } catch (error) {
      setError("An error occurred during payment");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <h1 className="font-semibold text-center text-2xl mb-6 bg-gray-100 p-4">Checkout</h1>
      <div className="container mx-auto p-6">
        <div className="flex justify-center mx-14 gap-4 ">
          <div className="w-3/5 bg-white p-6 rounded ">
            {/* Delivery Address Section */}
            <h3 className="text-xl font-semibold mb-4">1. Select a delivery address</h3>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
                <h4 className="font-bold text-lg">Your addresses</h4>
                <p className="text-sm font-semibold">Sending items to more than one address?</p>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 flex items-center mb-4">
                <input type="radio" name="address" className="mr-4" />
                <div>
                  <p>Priti Vilas Parkhe</p>
                  <p>House no 479, Sanklp Colony Near Sai Hospital</p>
                  <p>Mahdev Nagar, Manjri Road, Pune, Maharashtra, 412307, India</p>
                  <a href="#" className="text-blue-500 text-sm">Edit address</a>
                </div>
              </div>
              <button className="bg-yellow-400 rounded-full px-4 py-2 font-bold">Use this address</button>
              <div className="mt-4">
                <button className="text-blue-500 font-semibold">+ Add a new address</button>
              </div>
            </div>

            {/* Payment Method Section */}
            <h3 className="text-xl font-semibold mb-4">2. Select a payment method</h3>
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-lg mb-4">Your available balance</h4>
              <div className="flex items-center mb-4">
                <input type="text" placeholder="Enter code" className="border border-gray-300 rounded-lg p-2 mr-4 flex-1" />
                <button className="px-4 py-2 bg-yellow-400 rounded-full font-bold">Apply</button>
              </div>
              <h4 className="font-bold text-lg mb-4">Add a payment method</h4>
              <div className="flex items-center">
                <input type="radio" name="payment" className="mr-4" />
                <label>Credit/Debit Card</label>
              </div>
            </div>

            {/* Items Delivery Section */}
            <h3 className="text-xl font-semibold mb-4">3. Review items and delivery</h3>
            <div className="border border-gray-300 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-4">Your Items</h4>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                data.map((item) => (
                  <div key={item.productId._id} className="flex items-center mb-4">
                    <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover mr-4" />
                    <div className="flex-1">
                      <h5 className="font-bold">{item.productId.name}</h5>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₹{item.productId.price}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-1/5 bg-white p-6 rounded border border-gray-300 h-1/3">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="mb-4">
              <p>Items: <span className="float-right">₹{data.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)}</span></p>
              <p>Shipping: <span className="float-right">₹50</span></p>
              <p className="font-bold">Total: <span className="float-right">₹{data.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) + 50}</span></p>
            </div>
            <button className="w-full bg-yellow-400 rounded-full px-4 py-2 font-bold" onClick={handlePayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
