const express = require("express");
const app = express();
const routes = require("./routes/contacts");
const mongodb = require('./db/connect');
const port = process.env.port || 3000;

app.use("/contacts", routes);

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});