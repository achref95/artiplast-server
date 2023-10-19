const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { createProduct, getProduct } = require("../controllers/productController")

router.get("/get", isAuthenticated, getProduct)
router.post("/", isAuthenticated, createProduct)

module.exports = router;