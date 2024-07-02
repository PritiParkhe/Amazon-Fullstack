import AllApiUrls from "../services"
import { toast } from 'react-toastify';

const addToCard = async(e,productId) =>{
  e?.stopPropagation()
  e?.preventDefault()

  try {
    const response = await fetch(AllApiUrls.addToCartProduct.url,{
      method: AllApiUrls.addToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: productId
      })
    })
    const responseData = response.json()
    if (responseData.ok) {
      toast.success(responseData.message)
      
    }
    if (responseData.error) {
      toast.error(responseData.message)
    }
    
  } catch (error) {
    console.error("Error add to cart product:", error);
      toast.error("Error add to");
  }

}
export default addToCard