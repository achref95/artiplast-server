const Invoice = require('../models/Invoice.model');
const Client = require('../models/Client.model')

const generateInvoice = async (req, res, next) => {
  try {
    const { name, products, price, quantity } = req.body;

    if (!name || !products) {
      return res.status(400).json({ message: "Invalid input. Please provide valid name and products array." });
    }

    // Create the invoice with the provided products


    const newInvoice = new Invoice({
      products: products,
      price: price,
      quantity: quantity,
  
    });

    await newInvoice.save();

    // Find the client by name and update its invoices array with the new invoice ID
    const existingClient = await Client.findOneAndUpdate(
      { name: name },
      { $push: { invoices: newInvoice._id } },
      { new: true }
    );

    if (!existingClient) {
      // If the client does not exist, create a new client and associate the invoice with it
      const createdClient = await Client.create({ name: name, invoices: [newInvoice._id] });
      return res.status(200).json({ message: "Invoice created and associated with the new client.", client: createdClient });
    }

    return res.status(200).json({ message: "Invoice created and associated with the existing client.", client: existingClient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getInvoice = async (req, res, next ) => {
    try {
        const invoice = await Invoice.find()
        if (!invoice) {
            return res.status(400).json({message : "No invoices found"})
        }
        return res.status(200).json({invoice: invoice})
    } catch (error) {
        console.log(error)
    }
}

const deleteInvoice = async (req, res, next) => {
    try {
      const { _id } = req.params;
  
      if (!_id) {
        return res.status(400).json({ message: "Invoice id not received" });
      }
  
      const deletedInv = await Invoice.findByIdAndRemove(_id);
  
      if (!deletedInv) {
        return res.status(400).json({ message: "No invoice found with this id" });
      }
  
      return res.status(200).json({ message: "Invoice deleted" });
    } catch (error) {
      console.error(error);
    }
  };
  

module.exports = {
    generateInvoice,
    getInvoice,
    deleteInvoice,
}