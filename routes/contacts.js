const express = require("express");
const router = new express.Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.getAllData);

router.get("/:contactId", contactController.getDataById);

module.exports = router;