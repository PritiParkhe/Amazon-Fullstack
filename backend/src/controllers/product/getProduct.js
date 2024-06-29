import productModel from '../../models/productModel.js'
const getAllProductController = async(req,res)=>{
  try {
    const getallProduct = await productModel.find().sort({createdAt : -1 })
    res.json({
      message: "All Product",
      success: true,
      error: false,
      data : getallProduct
    })
    
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
    
  }
}
export{getAllProductController};