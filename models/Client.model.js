const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    invoice: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Invoice"
    },

  },
  {
    timestamps: true,
  }
);

const Client = model("Client", clientSchema);

module.exports = Client;
