const Invoice = require('../models/Invoice.model');
const Client = require('../models/Client.model');
const Product = require('../models/Product.model');

const generateInvoice = async (req, res, next) => {
  try {
    const { name, products, price, quantity } = req.body;

    const generateInvoiceNumber = () => {
      const prefix = "Facture N°"; // Static prefix for the invoice number
      const currentDate = new Date();
      const timestamp = currentDate.getFullYear(); // Current timestamp in milliseconds
      const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, "0"); // Random 3-digit number
    
      return `${prefix} ${timestamp}${randomDigits}`;
    };
    const invoiceNumber = generateInvoiceNumber();

    if (!name || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: "Invalid input. Please provide valid name and products array." });
    }

    // Find the product IDs corresponding to the product names
    const productIds = await Product.find({ product: { $in: products } }).select('_id');
    
    if (productIds.length === 0) {
      return res.status(400).json({message: "This Product does not exist, please add it in the add product page"})
    }

    // Extract the product IDs from the result
    const productIdsArray = productIds.map(product => product._id);

    // Create the invoice with the provided products
    const newInvoice = new Invoice({
      invoiceNumber: invoiceNumber,
      products: productIdsArray,
      price: price,
      quantity: quantity
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
      return res.status(200).json({ message: "Invoice created and associated with the new client.", client: createdClient, invoiceNumber: invoiceNumber  });
    }

    return res.status(200).json({ message: "Invoice created and associated with the existing client.", client: existingClient, invoiceNumber: invoiceNumber });
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