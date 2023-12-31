const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { 
        generateInvoice,
        getInvoice,
        deleteInvoice,
        getInvoiceDetail
        } = require("../controllers/invoiceController");

router.get("/get", isAuthenticated, getInvoice);
router.get("/:invoiceId", isAuthenticated, getInvoiceDetail);
router.post("/generate", isAuthenticated, generateInvoice);
router.delete("/delete/:_id", isAuthenticated, deleteInvoice);


module.exports = router;