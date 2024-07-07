import productModel from "../../models/productModel.js";

const filterProductController = async (req, res) => {
  try {
    const categoryList = req.body.category || [];
    console.log('Received categories:', categoryList); // For debugging
    const products = await productModel.find({
      category: { $in: categoryList },
    });
    console.log('Retrieved products:', products); // For debugging
    res.json({
      data: products,
      message: "Products retrieved successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { filterProductController };
