const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { 
        generateInvoice,
        getInvoice
        } = require("../controllers/invoiceController");

router.post("/generate", isAuthenticated, generateInvoice);
router.get("/get", isAuthenticated, getInvoice);

module.exports = router;