import express from "express";
import {
  getDirector,
  getDirectors,
  postDirector,
  pacthDirector,
  deleteDirector,
} from "../controllers/director.controller.js";

const router = express.Router();

router.get("/", getDirectors);
router.get("/:id", getDirector);

router.post("/", postDirector);
router.patch("/:id", pacthDirector);

router.delete("/:id", deleteDirector);

export default router;
