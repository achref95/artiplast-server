const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { createProduct } = require("../controllers/productController")

router.post("/", isAuthenticated, createProduct)

module.exports = router;