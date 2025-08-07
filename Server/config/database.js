const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected successfully"))
    .catch((err) => {
        console.log("Problem in connecting DB");
        console.log(err);
        process.exit(1);
    });
}