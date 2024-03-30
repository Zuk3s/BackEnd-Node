import express from "express";
import {
  deleteGenre,
  getGenres,
  postGenre,
} from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/", getGenres);
router.post("/", postGenre);
router.delete("/:id", deleteGenre);

export default router;
