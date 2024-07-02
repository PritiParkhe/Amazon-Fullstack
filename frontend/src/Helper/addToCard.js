import AllApiUrls from "../services"
import { toast } from 'react-toastify';

const addToCard = async (e, id) => {
  // Ensure e is an event object before calling stopPropagation and preventDefault
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  try {
    const response = await fetch(AllApiUrls.addToCartProduct.url, {
      method: AllApiUrls.addToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: id
      })
    });
    
    const responseData = await response.json(); // Ensure responseData is awaited

    if (response.ok) { // Check response.ok instead of responseData.ok
      toast.success(responseData.message);
    } else if (responseData.error) {
      toast.error(responseData.message);
    }

  } catch (error) {
    console.error("Error add to cart product:", error);
    toast.error("Error add to");
  }
};

export default addToCard;