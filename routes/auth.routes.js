const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { Signup } = require("../controllers/signupController");


router.post("/signup", isAuthenticated, Signup)

module.exports = router;
