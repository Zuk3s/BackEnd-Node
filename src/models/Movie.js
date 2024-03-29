import mongoose, { version } from "mongoose";

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
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      default: [],
    },
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
