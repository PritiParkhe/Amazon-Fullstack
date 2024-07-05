import addToCartProductModel from "../../models/cartProduct.js";

const updateProductController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    const updateProduct = await addToCartProductModel.updateOne(
      { _id: addToCartProductId },
      { quantity: qty }
    );

    res.json({
      message: "Product Updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

export { updateProductController };
