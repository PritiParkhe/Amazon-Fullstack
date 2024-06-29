import productModel from "../models/productModel.js";
import uploadProductPermission from "../Helper/Permission.js";

async function updateProductController (req,res){
  try {
    if(!await uploadProductPermission(req.userId)){
      throw new Error("Permission denied")
    }
    const{_id, ...resBody} = req.body
    const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
    res.json({
      message : "Product upadted succesfully",
      data : updateProduct,
      success : true,
      error : false
    })
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export{updateProductController};