const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { getClient, getClientSuggestions, clientPopulate } = require("../controllers/clientController");

router.get("/suggestions", getClientSuggestions);
router.get("/details", clientPopulate)
// router.get("/:id", getClient);


module.exports = router;