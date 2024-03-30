import mongoose from "mongoose";

export const DirectorSchema = new mongoose.Schema(
  {
    directorName: { type: String, required: true },
    nationality: { type: String },
  },
  { versionKey: false }
);

export const Director = mongoose.model("Director", DirectorSchema);
