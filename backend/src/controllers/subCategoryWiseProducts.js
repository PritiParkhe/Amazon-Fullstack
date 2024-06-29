// controllers/subCategoryWiseProducts.js

import Product from '../models/productModel.js';

const SubcategoryWiseProductController = async (req, res) => {
  const { category, subcategory } = req.body;

  try {
    let filters = {};

    // If category is provided, add it to the filter
    if (category) {
      filters.category = category;
    }

    // If subcategory is provided, add it to the filter
    if (subcategory) {
      filters.subCategory = subcategory;
    }

    // Fetch products matching the filters
    const products = await Product.find(filters);

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: 'No products found for the given category and subcategory',
        success: false,
        error: true,
      });
    }

    res.json({
      data: products,
      message: 'Products retrieved successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving products',
      success: false,
      error: true,
    });
  }
};

export { SubcategoryWiseProductController };
