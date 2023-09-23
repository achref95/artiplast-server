const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { generateInvoice } = require("../controllers/invoiceController");

router.post("/generate", isAuthenticated, generateInvoice)

module.exports = router;