import addToCartProductModel from "../../models/cartProduct.js";

const deleteCartProduct = async (req, res) => {
  try {
    const addToCartProductId = req.body._id;

    const deleteProduct = await addToCartProductModel.deleteOne({
      _id: addToCartProductId,
    });

    res.json({
      message: "Product Deleted From Cart",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

export { deleteCartProduct };
