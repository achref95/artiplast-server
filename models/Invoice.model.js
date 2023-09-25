const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  { client: {
    type: String,
    required: true,
    unique: true,
    },  
    product: {
      type: [String],
      required: true,
    },
    price: {
      type: [Number],
      required: true
    },
    quantity: {
      type: [Number],
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
