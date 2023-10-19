const mongoose = require('mongoose');
const Client = require('./models/Client.model');
const Product = require('./models/Product.model');
const Invoice = require('./models/Invoice.model');

mongoose.connect('mongodb://127.0.0.1:27017/artiplast-server', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateRandomClient = () => {
  return new Client({ name: 'Client' + Math.floor(Math.random() * 100000) });
};

const generateRandomProduct = () => {
  return new Product({ product: 'Product' + Math.floor(Math.random() * 100000) });
};

const generateRandomInvoice = (clients, products) => {
  const client = clients[Math.floor(Math.random() * clients.length)];
  const product = products[Math.floor(Math.random() * products.length)];
  const price = Math.random() * 100;
  const quantity = Math.floor(Math.random() * 100);
  return new Invoice({ client: client._id, products: [product._id], price, quantity });
};

const insertClients = async (count) => {
  const clients = [];
  for (let i = 0; i < count; i++) {
    clients.push(generateRandomClient());
  }
  await Client.insertMany(clients);
  return clients;
};

const insertProducts = async (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(generateRandomProduct());
  }
  await Product.insertMany(products);
  return products;
};

const insertInvoices = async (count, clients, products) => {
  const invoices = [];
  for (let i = 0; i < count; i++) {
    invoices.push(generateRandomInvoice(clients, products));
  }
  await Invoice.insertMany(invoices);
};

(async () => {
  const numberOfClients = 9000;
  const numberOfProducts = 10000;
  const numberOfInvoices = 100000;

  const clients = await insertClients(numberOfClients);
  const products = await insertProducts(numberOfProducts);

  await insertInvoices(numberOfInvoices, clients, products);

  console.log('Data inserted successfully.');
  mongoose.disconnect();
})();
