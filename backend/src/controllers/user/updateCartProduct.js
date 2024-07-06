const updateProductController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const { _id, quantity } = req.body;

    // Update query
    const updateProduct = await addToCartProductModel.findOneAndUpdate(
      { _id, userId: currentUserId },
      { $set: { quantity } },
      { new: true } // Ensure we get the updated document back
    );

    if (!updateProduct) {
      return res.status(400).json({
        message: "Failed to update product quantity",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Product updated successfully",
      data: updateProduct, // Return updated product data
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};
