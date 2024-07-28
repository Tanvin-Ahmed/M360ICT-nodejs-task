import { Router } from "express";
import {
  createNewAuthor,
  deleteAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
} from "../controllers/author";

const router = Router();

router.post("/", createNewAuthor);
router.get("/", getAllAuthors);
router.get("/:id", getSingleAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
