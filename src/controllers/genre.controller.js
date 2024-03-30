import { Genre } from "../models/Genre.js";

export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postGenre = async (req, res) => {
  try {
    const genreName = req.body.genreName;

    const existGenre = await Genre.findOne({ genreName });
    if (existGenre)
      return res.status(409).json({ message: "This genre already exists." });

    const genre = new Genre({ genreName });

    await genre.save();
    res.status(201).json(genre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByIdAndDelete(id);
    if (!genre)
      return res.status(404).json({ message: `The genre was not found.` });
    res.status(204).send("No Content");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
