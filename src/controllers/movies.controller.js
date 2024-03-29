import { Movie } from "../models/Movie.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ error: "The movie with the given ID was not found." });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postMovie = async (req, res) => {
  try {
    const { movieName, ...otherFields } = req.body;

    const existMovie = await Movie.findOne({ movieName });
    if (existMovie) return res.status(409).json("This movie already exists.");

    const newMovie = new Movie({
      movieName,
      ...otherFields,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const pacthMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { movieName, ...otherFields } = req.body;
    const movie = await Movie.findById(id);
    if (!movie)
      return res.status(404).json({ message: "The movie was not found." });

    const existMovie = await Movie.findOne({ movieName });
    if (existMovie) return res.status(409).json("This movie already exists.");

    Object.assign(movie, req.body);
    const updatedMovie = await movie.save();

    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie)
      return res.status(404).json({ message: "The movie was not found." });
    res.status(204).send("No Content");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
