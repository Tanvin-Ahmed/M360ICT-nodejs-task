import { Router } from "express";
import {
  createNewBook,
  deleteBook,
  getAllBookOfSpecificAuthor,
  getAllBooks,
  getBookDetailWithAuthor,
  getSingleBook,
  searchBooks,
  updateBook,
} from "../controllers/book";

const router = Router();
// filter book by title
router.get("/search", searchBooks);
// other routes
router.post("/", createNewBook);
router.get("/", getAllBooks);
router.get("/author/:id", getAllBookOfSpecificAuthor);
router.get("/:id", getSingleBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
// view
router.get("/:id/details-with-author", getBookDetailWithAuthor);

export default router;
