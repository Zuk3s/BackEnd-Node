import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import movieRoute from "./src/routes/movies.router.js";
import directorRoute from "./src/routes/director.router.js";
import genreRoute from "./src/routes/genre.router.js";

const app = express();
app.use(express.json());
dotenv.config();

//ROUTES
app.use("/movies", movieRoute);
app.use("/director", directorRoute);
app.use("/genre", genreRoute);

// Connect to MongoDB database

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} could not connect to the database`);
  });
