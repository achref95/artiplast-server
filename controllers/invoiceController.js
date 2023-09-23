const Invoice = require('../models/Invoice.model');

const generateInvoice = async (req, res, next) => {
    try {
        const { product, price, quantity } = req.body
        console.log(product)
        if (product === "" || price === ""|| quantity === "") {
            return res.status(400).json({ message: "Provide product, price and quantity." });
          }
        await Invoice.create({product, price, quantity })
        return res.status(200).json({ message: "invoice created and stored"})
    } catch (error) {
        console.log(error)
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

module.exports = {
    generateInvoice,
    getInvoice,
}