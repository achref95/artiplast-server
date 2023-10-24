const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    taxNumber: {
      type: String,
      // required: true
    },
    adress: {
      type: String,
    },
    invoices: [{
      type: Schema.Types.ObjectId,
      ref: 'Invoice'
    }]

  },
  {
    timestamps: true,
  }
);

const Client = model("Client", clientSchema);

module.exports = Client;
