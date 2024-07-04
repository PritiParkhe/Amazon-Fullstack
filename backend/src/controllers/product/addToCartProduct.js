import addTocartProductModel from "../../models/cartProduct.js"

const addToCartProductController = async(req, res) => {
  try {
    const { productId } = req?.body
    const currentUser = req.userId

    const payload = {
      productId : productId,
      quantity: 1,
      userId: currentUser
    
    } 
    const newAddToCard = new addTocartProductModel(payload)
    const saveProduct = await newAddToCard.save()
    res.json({
      data: saveProduct,
      message: "Product added sucessfully",
      success: true,
      error: false
    })

  } catch (error) {
    res.status(400).json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
}
export {addToCartProductController}