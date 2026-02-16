import { Router } from "express";
import controllers from "../controllers/notesControllers.js";
const { getAllNotes, getNoteById, createNote, deleteNote, updateNote } = controllers;

const router = Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;