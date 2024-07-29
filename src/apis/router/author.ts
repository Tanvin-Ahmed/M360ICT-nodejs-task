import { Router } from "express";
import {
  createNewAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorDetailWithBooks,
  getAuthorsWithBooks,
  getSingleAuthor,
  getSpecificAuthorBooks,
  updateAuthor,
} from "../controllers/author";

const router = Router();

// views
router.get("/list-with-books", getAuthorsWithBooks);
router.get("/:id/details-with-books", getAuthorDetailWithBooks);
// other routes
router.post("/", createNewAuthor);
router.get("/", getAllAuthors);
router.get("/:id", getSingleAuthor);
router.get("/:id/books", getSpecificAuthorBooks);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
