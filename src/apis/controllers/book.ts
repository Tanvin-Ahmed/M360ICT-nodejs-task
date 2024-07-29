import { Request, Response } from "express";
import {
  bookSchema,
  isNumber,
  isString,
} from "../../utils/dataValidation/dataValidator";
import {
  deleteBookById,
  findAllBookOfAnAuthor,
  findAllBooks,
  findBookDetailWithAuthor,
  findBooksLike,
  findSingleBookById,
  saveNewBook,
  updateBookById,
} from "../services/book";
import { CreateBookRequest } from "../../types";

export const createNewBook = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // check the data is valid or not
    const value = await bookSchema.validateAsync(data);

    const savedBook = await saveNewBook(value as CreateBookRequest);

    return res.status(201).json(savedBook);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: true, message: "Book not saved. Please try again." });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit as string;
    const page = req.query.page as string;

    // type check for limit and page
    const { error: limitError } = isNumber.validate(limit);
    const { error: pageError } = isNumber.validate(page);
    if (limitError || pageError) {
      return res.status(400).json({
        error: true,
        message: "Limit and page number must be a integer number",
      });
    }

    const allBooks = await findAllBooks(Number(limit), Number(page));

    return res.status(200).json(allBooks);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No books exists." });
  }
};

export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    // type check for id
    const { error } = isNumber.validate(id);
    if (error) {
      return res.status(400).json({
        error: true,
        message: "ID must be a integer number",
      });
    }

    const bookInfo = await findSingleBookById(Number(id));

    return res.status(200).json(bookInfo);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No book found." });
  }
};

export const getAllBookOfSpecificAuthor = async (
  req: Request,
  res: Response
) => {
  try {
    const authorId = req.params.id as string;
    // type check for id
    const { error } = isNumber.validate(authorId);
    if (error) {
      return res.status(400).json({
        error: true,
        message: "Author ID must be a integer number",
      });
    }

    const bookList = await findAllBookOfAnAuthor(Number(authorId));

    return res.status(200).json(bookList);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No books found." });
  }
};

export const getBookDetailWithAuthor = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id as string;
    // type check for id
    const { error } = isNumber.validate(bookId);
    if (error) {
      return res.status(400).json({
        error: true,
        message: "Book ID must be a integer number",
      });
    }

    const booDetailsWithAuthor = await findBookDetailWithAuthor(Number(bookId));

    if (!booDetailsWithAuthor) {
      return res.status(404).json({ error: true, message: "No book found." });
    }

    return res.status(200).json(booDetailsWithAuthor);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No book found." });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const title = req.query.title;

    const { error, value } = isString.validate(title);
    if (error) {
      return res.status(400).json({ error: true, message: error.message });
    }

    const searchResult = await findBooksLike(value);

    return res.status(200).json(searchResult);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No book found" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    // type check for id
    const { error } = isNumber.validate(id);
    if (error) {
      return res.status(400).json({
        error: true,
        message: "ID must be a integer number",
      });
    }
    //   validate data
    const value = await bookSchema.validateAsync(data);

    const updateInfo = await updateBookById(
      Number(id),
      value as CreateBookRequest
    );

    return res.status(200).json(updateInfo);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: true, message: "Book not updated. Please try again." });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    // type check for id
    const { error } = isNumber.validate(id);
    if (error) {
      return res.status(400).json({
        error: true,
        message: "ID must be a integer number",
      });
    }

    const deleteInfo = await deleteBookById(Number(id));

    return res.status(200).json(deleteInfo);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: true, message: "Book not deleted. Please try again." });
  }
};
