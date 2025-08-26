const Movie = require("../models/movie.model");
const path = require("path");
const fs = require("fs");


exports.getMovies = async (req, res) => {
    let allMovies = await Movie.find();
    return res.render("index", { allMovies });
};

exports.add = async (req, res) => {
    return res.render("add");
}


exports.addMovie = async (req, res) => {
    let imagePath = "";
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }
    req.body.image = imagePath;

    let newMovie = await Movie.create(req.body);
    if (newMovie) {
        return res.redirect("/");
    }
};



exports.deleteMovie = async (req, res) => {
    let id = req.params.id;
    let record = await Movie.findById(id);
    if (record.image) {
        let imagePath = path.join(__dirname, "..", record.image);
        try {
            await fs.unlinkSync(imagePath);
        } catch (error) {
            console.log("File Missing...");
        }
    }
    record = await Movie.findByIdAndDelete(id);

    if (record) {
        console.log("Delete Success");
        return res.redirect("/");
    } else {
        console.log("Error...");
        return res.redirect("back");
    }
};



exports.editMovie = async (req, res) => {
    let record = await Movie.findById(req.params.id);
    return res.render("edit", { movie: record });
};


exports.viewMovie = async (req, res) => {
    let record = await Movie.findById(req.params.id);
    return res.render("view", { movie: record });
}

exports.updateMovie = async (req, res) => {
    let record = await Movie.findById(req.params.id);
    if (record) {
        if (req.file) {
            if (record.image) {
                let imagePath = path.join(__dirname, "..", record.image);
                try {
                    await fs.unlinkSync(imagePath);
                } catch (error) {
                    console.log("File Missing...");
                }
            }
            req.body.image =` /uploads/${req.file.filename}`;
        }
        await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Update success");
        return res.redirect("/");
    } else {
        return res.redirect("back");
    }
};