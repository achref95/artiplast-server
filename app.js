require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const invoiceRoutes = require("./routes/invoice.routes");
app.use("/invoice", invoiceRoutes);

const clientRoutes = require("./routes/client.routes");
app.use("/client", clientRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/product", productRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
