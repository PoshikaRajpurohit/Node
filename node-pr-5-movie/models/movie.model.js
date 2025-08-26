const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");


const movieSchema = mongoose.Schema({
    title: 
    { type: String, 
        required: true },
    director: 
    { type: String,
        required: true },
    genre: 
    { type: String,
         required: true },
    year:
     { type: Number, 
        required: true },
    description:
     { type: String },
    cast: { type: String },
    image: { type: String },
});


const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null,` movieimage-${Date.now()}${path.extname(file.originalname)}`);
    }
});

movieSchema.statics.uploadImage = multer({ storage: storageImage }).single("image");


const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;