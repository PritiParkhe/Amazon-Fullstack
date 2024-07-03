import mongoose from "mongoose";

const addTocartProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const addTocartProductModel = mongoose.model("addToCartProduct", addTocartProductSchema);

export default addTocartProductModel;
