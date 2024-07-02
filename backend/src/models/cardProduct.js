import mongoose from "mongoose";

const addTocartProductSchema = new mongoose.Schema({
  productId :{
    type: String
  },
  quantity: {
    type: Number
  },
  userId: {
    type: String
  }

},{ timestamps: true }
);

// Create the Product model using the schema
const addTocartProductModel = mongoose.model("addToCardProduct", addTocartProductSchema);

export default addTocartProductModel;
