const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { getClients, addClient, getAll } = require("../controllers/clientController");

router.get("/all", isAuthenticated, getAll);
router.get("/get", isAuthenticated, getClients);
router.post("/add", isAuthenticated, addClient);
// router.get("/:id", getClient);


module.exports = router;