import productModel from "../models/productModel.js";
const getCategoryWiseProductController = async (req, res) => {
  try {
    const { category } = req.body;
    console.log("Received category:", category);

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
        success: false,
        error: true
      });
    }

    const products = await productModel.find({ category });
    console.log(products, "data");

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
