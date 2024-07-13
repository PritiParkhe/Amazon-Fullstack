import addTocartProductModel from "../../models/cartProduct.js";

const countAddToProductController = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(`Counting products for user: ${userId}`);
    const count = await addTocartProductModel.countDocuments({ userId: userId });
    // console.log(`Count result: ${count}`);

    res.json({
      data: {
        count: count,
      },
      message: "ok",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export { countAddToProductController };
