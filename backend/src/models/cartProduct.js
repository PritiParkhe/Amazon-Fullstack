import mongoose from "mongoose";

const addTocartProductSchema = new mongoose.Schema(
  {
    productId: {
      ref: "Product",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const addTocartProductModel = mongoose.model(
  "addToCartProduct",
  addTocartProductSchema
);

export default addTocartProductModel;
