const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { signup } = require("../controllers/signupController");
const { login } = require("../controllers/loginController");


router.post("/signup", signup)
router.post("/login", login)
router.get("/verify", isAuthenticated, (req, res, next) => {
    console.log(`req.payload`, req.payload);
    res.status(200).json(req.payload);
  });

module.exports = router;
