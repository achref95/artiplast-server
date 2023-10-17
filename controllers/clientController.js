const Invoice = require('../models/Invoice.model');
const Client = require('../models/Client.model');

const getClient = async (req, res, next) => {
    try {
        const {id} = req.params
        const invoice = await Invoice.findById(id)
        console.log(invoice)
        if (!invoice) {
            return res.status(400).json({message : "No invoices found"})
        }

        const clientName = invoice.client
        return res.status(200).json({client: clientName})
    } catch (error) {
        console.log(error)
    }
};

const getClientSuggestions = async (req, res, next) => {
    try {
        // Fetch distinct client names from your database
        const clients = await Invoice.distinct("client");
        console.log(clients)
        return res.status(200).json({ clients });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const clientPopulate = async (req, res, next) => {
    try {
        // Fetch all invoices with their associated clients from your MongoDB database
        const clientsWithInvoices = await Invoice.find({}).populate("client");
        res.json(clientsWithInvoices);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

module.exports = {
    getClient,
    getClientSuggestions,
    clientPopulate,
}