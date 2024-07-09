import { stripe } from "../../config/stripe.js";
import userModel from "../../models/userModel.js";

const paymentController = async (req, res) => {
  try {
    const { cardItems } = req.body;
    console.log(cardItems, "cardItems");
    const user = await userModel.findOne({ _id: req.userId });
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card", "upi"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1PaChiSBSBI4t3q40lVm8pSe",
        },
      ],
      customer_email: user.email,
      line_items: cardItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {},
            name : item.productId.title,
            Images : item.productId.productImage,
            metadata : {
              productId : item.productId._id
            },
            unit_amount : item.productId.sellingPrice
          },
          adjustable_quantity : {
            enabled : true,
            minimum : 1
          },
          quantity : item.quantity
        };
      }),
    };
    const session = await stripe.checkout.sessions.create(params);
    res.status(303).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export { paymentController };
