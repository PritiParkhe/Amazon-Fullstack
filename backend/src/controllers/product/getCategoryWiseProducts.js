import productModel from "../models/productModel.js";

const getCategoryWiseProductController = async (req, res) => {
  try {
    const { subCategory } = req.body;

    if (!subCategory) {
      return res.status(400).json({
        message: "SubCategory is required",
        success: false,
        error: true
      });
    }

    const products = await productModel.find({ subCategory });
    

    res.json({
      data: products,
      message: "Products retrieved successfully",
      success: true,
      error: false
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      message: err.message || "An error occurred while retrieving products",
      success: false,
      error: true
    });
  }
};

export { getCategoryWiseProductController };
