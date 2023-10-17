const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    product: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;