import express from "express";
import {
  getMovies,
  getMovie,
  postMovie,
  pacthMovie,
  deleteMovie,
} from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie);

router.post("/", postMovie);
router.patch("/:id", pacthMovie);

router.delete("/:id", deleteMovie);

export default router;
