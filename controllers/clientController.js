const Invoice = require('../models/Invoice.model');
const Client = require('../models/Client.model');

const getClientSuggestions = async (req, res, next) => {
    try {
        // Fetch distinct client names from your database
        const clients = await Client.find();
        console.log(clients)
        const clientNames = clients.map(client => client.name);

        return res.status(200).json({ clients: clientNames });  
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
    getClientSuggestions,
    clientPopulate,
}