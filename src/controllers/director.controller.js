import { Director } from "../models/Director.js";

export const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.status(200).json(directors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDirector = async (req, res) => {
  const { id } = req.params;
  try {
    const director = await Director.findById(id);
    if (!director) {
      return res
        .status(404)
        .json({ error: "The director with the given ID was not found." });
    }
    res.status(200).json(director);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postDirector = async (req, res) => {
  try {
    const { directorName, nationality } = req.body;

    const existDirector = await Director.findOne({ directorName });
    if (existDirector)
      return res.status(409).json("This director already exists.");

    const newDirector = new Director({
      directorName,
      nationality,
    });

    const savedDirector = await newDirector.save();
    res.status(201).json(savedDirector);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const pacthDirector = async (req, res) => {
  try {
    const { id } = req.params;
    const { directorName, nationality } = req.body;
    const director = await Director.findById(id);
    if (!director)
      return res.status(404).json({ message: "The director was not found." });

    const existDirector = await Director.findOne({ directorName });
    if (existDirector)
      return res.status(409).json("This director already exists.");

    Object.assign(director, req.body);
    const updatedDirector = await director.save();

    res.status(200).json(updatedDirector);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDirector = async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findByIdAndDelete(id);
    if (!director)
      return res.status(404).json({ message: "The director was not found." });
    res.status(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
