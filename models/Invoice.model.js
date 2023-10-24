const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  { 
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true
    },
    products: {
      type: [Schema.Types.ObjectId],
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
    //TVA
  },
  {
    timestamps: true,
  }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
