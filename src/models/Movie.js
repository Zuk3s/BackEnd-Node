import mongoose from "mongoose";
import { DirectorSchema } from "./Director.js";

const MovieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      min: 10,
    },
    director: {
      type: DirectorSchema,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    year: Number,
    movieImage: String,
    realImage: {
      type: [String],
      default: [],
    },
    stars: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

export const Movie = mongoose.model("Movie", MovieSchema);
