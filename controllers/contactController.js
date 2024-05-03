const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllData = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
}

const getDataById = async (req, res, next) => {
    // This form is deprecated:
    // const contactId = new ObjectId(req.params.contactId);

    const contactId = ObjectId.createFromHexString(req.params.contactId);

    const result = await mongodb.getDb().db().collection("contacts").find({ _id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
}

const createContact = async (req, res, next) => {
    // Validate request
    // console.log(req.body);
    if (!req.body.firstName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a contact
    const newContact = {
        _id: new ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };

    // Add contact to database
    const result = await mongodb.getDb().db().collection("contacts").insertOne(newContact);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
}

const updateContact = async (req, res, next) => {
    
    const contactId = req.params.id;

    // Define the update operation
    const updateOperation = {
        $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        }
    };

    // Perform the update operation
    const result = await mongodb.getDb().db().collection("contacts").updateOne(
        { _id: ObjectId.createFromHexString(contactId) },
        updateOperation
    );

    if (result.modifiedCount === 1) {
        // Document updated successfully
        res.status(200).json({ message: "Contact updated successfully" });
    } else {
        // Document not found or no changes made
        res.status(404).json({ message: "Contact not found or no changes made" });
    }
}

const deleteContact = async (req, res, next) => {
    
    const contactId = req.params.id;

    // Perform the delete operation
    const result = await mongodb.getDb().db().collection("contacts").deleteOne(
        { _id: ObjectId.createFromHexString(contactId) }
    );

    // Check the result to see if the delete was successful
    if (result.deletedCount === 1) {
        // Document deleted successfully
        res.status(200).json({ message: "Contact deleted successfully" });
    } else {
        // Document not found or no changes made
        res.status(404).json({ message: "Contact not found or no changes made" });
    }
}
module.exports = { getAllData, getDataById, createContact, updateContact, deleteContact };