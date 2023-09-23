const Invoice = require('../models/Invoice.model');

const generateInvoice = async (req, res, next) => {
    try {
        const { product, price, quantity } = req.body
        if (product === "" || price === ""|| quantity === "") {
            res.status(400).json({ message: "Provide product, price and quantity." });
            return;
          }
        await Invoice.create({product, price, quantity })
        return res.status(200).json({ message: "invoice created and stored"})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    generateInvoice,
}