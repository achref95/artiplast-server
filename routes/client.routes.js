const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { getClients, addClient, getAll, clientDetail } = require("../controllers/clientController");

router.get("/all", isAuthenticated, getAll);
router.get("/get", isAuthenticated, getClients);
router.get("/:clientId", isAuthenticated, clientDetail);
router.post("/add", isAuthenticated, addClient);


module.exports = router;