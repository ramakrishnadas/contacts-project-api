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

module.exports = { getAllData, getDataById };