const mongoose = require("mongoose");

const dbconnection = () => {
    mongoose.connect("mongodb+srv://Poshika_Rajpurohit:Kashipo2313@cluster0.pxtjzdj.mongodb.net/MovieData", )
        .then(() => console.log("DB is connected..."))
        .catch(err => console.error("DB Connection Error:", err));
};

module.exports = dbconnection
();