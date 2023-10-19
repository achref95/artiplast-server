const Client = require('../models/Client.model');

const getClients = async (req, res, next) => {
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

module.exports = {
    getClients,
}