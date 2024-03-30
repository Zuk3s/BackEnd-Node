import mongoose from "mongoose";
const GenreSchema = new mongoose.Schema(
  {
    genreName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Genre = mongoose.model("Genre", GenreSchema);
