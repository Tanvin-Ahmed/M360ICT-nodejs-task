import { Router } from "express";
import {
  createNewBook,
  deleteBook,
  getAllBookOfSpecificAuthor,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controllers/book";

const router = Router();

router.post("/", createNewBook);
router.get("/", getAllBooks);
router.get("/author/:id", getAllBookOfSpecificAuthor);
router.get("/:id", getSingleBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
