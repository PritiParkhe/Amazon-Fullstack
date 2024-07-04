import addTocartProductModel from "../../models/cardProduct.js";

const viewCartProductsController = async(req, res) => {
  try {
    const currentUser = req.userId

    const allProduct = await addTocartProductModel.find({
      userId : currentUser
    }).populate("productId")
    res.json({
      data : allProduct,
      success: true,
      error : false
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    }); 
  }
}
export{viewCartProductsController}