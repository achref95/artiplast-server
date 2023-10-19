const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { getClients } = require("../controllers/clientController");

router.get("/get", isAuthenticated, getClients);
// router.get("/:id", getClient);


module.exports = router;