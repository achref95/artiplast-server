const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { getClients, addClient, getAll } = require("../controllers/clientController");

router.get("/all", getAll);
router.get("/get", isAuthenticated, getClients);
router.post("/add", addClient);
// router.get("/:id", getClient);


module.exports = router;