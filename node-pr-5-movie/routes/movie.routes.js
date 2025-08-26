const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const Movie = require("../models/movie.model");

router.get("/", movieController.getMovies);
router.get("/add", movieController.add);
router.post("/add-movie", Movie.uploadImage, movieController.addMovie);
router.get("/delete-movie/:id", movieController.deleteMovie);
router.get("/edit-movie/:id", movieController.editMovie);
router.post("/update-movie/:id", Movie.uploadImage, movieController.updateMovie);
router.get("/view-movie/:id", movieController.viewMovie);

module.exports = router;