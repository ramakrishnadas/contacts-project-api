const express = require("express");
const router = new express.Router();
const contactController = require("../controllers/contactController");

// Get all contacts
router.get("/", contactController.getAllData);

// Get contact by id
router.get("/:contactId", contactController.getDataById);

// Create new contact
router.post("/", contactController.createContact);

// Update contact by id
router.put("/:id", contactController.updateContact);

// Delete contact by id
router.delete("/:id", contactController.deleteContact);

module.exports = router;