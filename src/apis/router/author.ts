import { Router } from "express";
import {
  createNewAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorDetailWithBooks,
  getAuthorsWithBooks,
  getSingleAuthor,
  getSpecificAuthorBooks,
  login,
  searchAuthors,
  updateAuthor,
} from "../controllers/author";

const router = Router();

// search
router.get("/search", searchAuthors);

// views
router.get("/list-with-books", getAuthorsWithBooks);
router.get("/:id/details-with-books", getAuthorDetailWithBooks);

// authentication routes
router.post("/", createNewAuthor);
router.post("/login", login);

// other routes
router.get("/", getAllAuthors);
router.get("/:id", getSingleAuthor);
router.get("/:id/books", getSpecificAuthorBooks);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
