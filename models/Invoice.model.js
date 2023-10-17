const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  { 
    products: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product"
    },
    price: {
      type: [Number],
      required: true
    },
    quantity: {
      type: [Number],
      required: true,
    },
    discount: {
      type: [Number],
    },
    //total
  },
  {
    timestamps: true,
  }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
