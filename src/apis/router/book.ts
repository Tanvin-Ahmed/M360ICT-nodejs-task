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
import { userAuthorization } from "../../middlewares/authorization";

const router = Router();
// filter book by title
router.get("/search", searchBooks);

// authorization implemented in these route (protected routes)
router.post("/", userAuthorization, createNewBook);
router.put("/:id", userAuthorization, updateBook);
router.delete("/:id", userAuthorization, deleteBook);

// other routes
router.get("/", getAllBooks);
router.get("/author/:id", getAllBookOfSpecificAuthor);
router.get("/:id", getSingleBook);

// view
router.get("/:id/details-with-author", getBookDetailWithAuthor);

export default router;
