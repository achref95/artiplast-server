const mongoose = require('mongoose');
const Invoice = require('./models/Invoice.model');

// Connect to your MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/artiplast-server', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to generate a random invoice
const generateRandomInvoice = () => {
  const client = 'Client' + Math.floor(Math.random() * 10000);
  const product = ['ProductA', 'ProductB', 'ProductC','ProductD', 'ProductE', 'ProductF','ProductG', 'ProductH', 'ProductI','ProductJ', 'ProductK', 'ProductL'];
  const price = Math.random() * 100;
  const quantity = Math.floor(Math.random() * 100);

  return new Invoice({ client, product, price, quantity });
};

// Function to insert a specified number of invoices
const insertInvoices = async (count) => {
  const invoices = [];

  for (let i = 0; i < count; i++) {
    invoices.push(generateRandomInvoice());
  }

  await Invoice.insertMany(invoices);
};

// Usage: Insert 1 million invoices
insertInvoices(300000).then(() => {
  console.log('300K invoices inserted successfully.');
  mongoose.disconnect();
});