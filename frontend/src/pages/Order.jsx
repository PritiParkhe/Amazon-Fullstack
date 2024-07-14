import React, { useEffect, useState } from "react";
import AllApiUrls from "../services";
import moment from "moment";
import displayINRCurrency from "../services/displayCurrency";
import MainHeader from "../components/Header/MainHeader";

const Order = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(AllApiUrls.getOrder.url, {
      method: AllApiUrls.getOrder.method,
      credentials: "include",
    });
    const responseData = await response.json();
    setData(responseData.data);
    console.log("orderList", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <>
      <MainHeader />
      <div className="container mx-auto p-4 bg-white">
        {!data.length && <p className="text-center">No Order available</p>}
        {data.map((item, index) => (
          <div key={item.userId + index} className="order-item my-4 p-4 border rounded shadow-sm">
            <p className="font-semibold text-lg mb-2">
              Order Date: {moment(item.createdAt).format("LL")}
            </p>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="order-products grid gap-4">
                {item.productDetails.map((product, index) => (
                  <div key={product.productId + index} className="product-item flex flex-col :flex-row gap-4 p-2 border rounded bg-gray-50">
                    <img
                      src={product.image[0]}
                      alt={product.title}
                      className="w-full sm:w-28 h-auto object-cover p-1 border rounded"
                    />
                    <div>
                      <p className="font-medium text-lg line-clamp-1">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-5 mt-1">
                        <span className="text-lg text-red-500">
                          {displayINRCurrency(product.price)}
                        </span>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-details flex flex-col gap-4 p-2 lg:min-w-[300px]">
                <div className="payment-details mb-4">
                  <h2 className="text-lg font-semibold">Payment Details</h2>
                  <p className="ml-2">Method: {item.paymentDetails.payment_method_type[0]}</p>
                  <p className="ml-2">Status: {item.paymentDetails.payment_status}</p>
                </div>
                <div className="shipping-details mb-4">
                  <h2 className="text-lg font-semibold">Shipping Details</h2>
                  {item.shipping_options.map((shipping, index) => (
                    <p key={shipping.shipping_rate} className="ml-2">
                      Amount: {shipping.shipping_amount}
                    </p>
                  ))}
                </div>
                <div className="total-amount font-semibold text-lg text-right lg:text-left">
                  Total: {displayINRCurrency(item.totalAmount)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;
