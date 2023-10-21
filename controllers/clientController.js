const Client = require('../models/Client.model');

const getClients = async (req, res, next) => {
    try {
        // Fetch distinct client names from your database
        const clients = await Client.find();
        console.log(clients)
        const clientNames = clients.map(client => ({
            name: client.name,
            taxNumber: client.taxNumber
        }));

        return res.status(200).json({ clientsData: clientNames });  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAll = async (req, res, next) => {
    try {
        const clients = await Client.find();
        console.log(clients)
        // const names = clients.map(client => ({
        //     _id: client._id,
        //     name: client.name,
        //   }));

        // return res.status(200).json({ clients: names });  
        return res.status(200).json({ clients: clients });  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const clientDetail = async (req, res, next) => {
    try {
        const {clientId} = req.params;
    
        // Find the client by ID in the database
        const client = await Client.findById(clientId);
    
        if (!client) {
          return res.status(400).json({ message: 'Client not found' });
        }
    
        // Return the client details
        return res.status(200).json({ client });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
}

const addClient = async (req, res, next) => {
    try {
        const {name, taxNumber} = req.body

        if (!name || !taxNumber) {
            res.status(400).json({message: "please provide name and tax number"})
        }

        const result = await Client.create({name, taxNumber})
        return res.status(201).json({message: "Client created successfully", Client: result})

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getClients,
    addClient,
    getAll,
    clientDetail,
}