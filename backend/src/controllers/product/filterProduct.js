import productModel from "../../models/productModel.js";

const filterProductController = async (req, res) => {
  try {
    const categories = req.body.category || [];
    // console.log('Received categories:', categories); // For debugging

    const products = await productModel.find({
      category: { $in: categories },
    });

    // console.log('Retrieved products:', products); // For debugging

    res.json({
      data: products,
      message: "Products retrieved successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { filterProductController };
