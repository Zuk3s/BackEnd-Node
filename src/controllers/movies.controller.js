import { Genre } from "../models/Genre.js";
import { Movie } from "../models/Movie.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("genres");
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id).populate("genres").exec();
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
    const { movieName, genres, ...otherFields } = req.body;

    const existMovie = await Movie.findOne({ movieName });
    if (existMovie) {
      return res.status(409).json({ message: "This movie already exists." });
    }

    if (genres) {
      const genreLookups = genres.map((genre) =>
        Genre.findOne({ genreName: genre }).exec()
      );

      const genreIds = await Promise.all(genreLookups);

      if (!Array.isArray(genres)) {
        return res.status(400).json({
          message: "The genres field must be an array.",
        });
      }

      const invalidGenres = genres.filter(
        (genre, index) => genreIds[index] === null
      );

      if (invalidGenres.length > 0) {
        return res.status(400).json({
          message:
            "One or more of the genres in the genres field do not exist in the Genre collection.",
        });
      }

      otherFields.genres = genreIds.map((genre) => genre._id);
    }

    const movie = new Movie({
      movieName,
      ...otherFields,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const pacthMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { movieName } = req.body;
    const movie = await Movie.findById(id);
    if (!movie)
      return res.status(404).json({ message: "The movie was not found." });

    const existMovie = await Movie.findOne({ movieName });
    if (existMovie) return res.status(409).json("This movie already exists.");

    Object.assign(movie, req.body);
    await movie.save();

    res.status(200).json(movie);
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

export const filterMoviesByGenre = (req, res) => {
  try {
    const genre = req.query.genre;
    if (!genre) throw new Error("Missing 'genre' parameter in query string.");

    const movies = Movie.find({ genre });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
