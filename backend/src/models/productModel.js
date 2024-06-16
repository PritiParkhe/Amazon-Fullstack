import mongoose from "mongoose";

// Define the schema for the Product model
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    productImage: [],
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Product model using the schema
const productModel = mongoose.model("Product", productSchema);

export default productModel;
