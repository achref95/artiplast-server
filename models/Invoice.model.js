const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  {
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
