const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  { 
    // invoice_number: {
    //   type: String,
    //   unique: true
    // },
    product: {
      type: String,
      required: true,
      // unique: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
