import { Request, Response } from "express";
import { bookSchema } from "../../utils/dataValidation/dataValidator";
import {
  deleteBookById,
  findAllBooks,
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
    const allBooks = await findAllBooks();

    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(404).json({ error: true, message: "No books exists." });
  }
};

export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const bookInfo = await findSingleBookById(id);

    return res.status(200).json(bookInfo);
  } catch (error) {
    return res.status(404).json({ error: true, message: "No book found." });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    //   validate data
    const value = await bookSchema.validateAsync(data);

    const updateInfo = await updateBookById(id, value as CreateBookRequest);

    return res.status(200).json(updateInfo);
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Book not updated. Please try again." });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleteInfo = await deleteBookById(id);

    return res.status(200).json(deleteInfo);
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Book not deleted. Please try again." });
  }
};
