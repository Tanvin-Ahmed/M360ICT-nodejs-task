import { Request, Response } from "express";
import {
  deleteAuthorById,
  findAllAuthors,
  findAuthorDetailWithBooks,
  findAuthorsWithBooks,
  findSingleAuthor,
  findSpecificAuthorBooks,
  saveAuthor,
  updateAuthorById,
} from "../services/author";
import {
  authorSchema,
  isNumber,
} from "../../utils/dataValidation/dataValidator";
import { CreateAuthorRequest } from "../../types";

export const createNewAuthor = async (req: Request, res: Response) => {
  try {
    const authorData = req.body;
    //   validate data
    const { error, value } = authorSchema.validate(authorData);
    if (error) {
      return res
        .status(400)
        .json({ error: true, details: error.details, message: error.message });
    }

    //   save the author data to the database
    const createdAuthor = await saveAuthor(value as CreateAuthorRequest);

    return res.status(201).json(createdAuthor);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: true, message: "Author not created. Please try again." });
  }
};

export const getAllAuthors = async (req: Request, res: Response) => {
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

    const authors = await findAllAuthors(Number(limit), Number(page));

    if (!authors?.length) {
      return res.status(404).json({ error: true, message: "No authors found" });
    }

    return res.status(200).json(authors);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No author exist." });
  }
};

export const getSingleAuthor = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id as string;
    // type check for id
    const { error } = isNumber.validate(id);
    if (error) {
      return res.status(400).json({
        error: true,
        message: "ID must be a integer number",
      });
    }

    const author = await findSingleAuthor(Number(id));

    if (!author) {
      return res.status(404).json({ error: true, message: "No author found" });
    }

    return res.status(200).json(author);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "Author not found" });
  }
};

export const getSpecificAuthorBooks = async (req: Request, res: Response) => {
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

    const bookList = await findSpecificAuthorBooks(Number(authorId));

    return res.status(200).json(bookList);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No books found." });
  }
};

export const getAuthorDetailWithBooks = async (req: Request, res: Response) => {
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

    const details = await findAuthorDetailWithBooks(Number(authorId));

    return res.status(200).json(details);
  } catch (error: any) {
    return res
      .status(404)
      .json({ error: true, message: "Author details with books not found" });
  }
};

export const getAuthorsWithBooks = async (req: Request, res: Response) => {
  try {
    const result = await findAuthorsWithBooks();

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(404)
      .json({ error: true, message: "Authors and books are not found" });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body;

    // type check for id
    const { error: idTypeError } = isNumber.validate(id);
    if (idTypeError) {
      return res.status(400).json({
        error: true,
        message: "ID must be a integer number",
      });
    }

    //   validate data
    const { error, value } = authorSchema.validate(data);
    if (error) {
      return res
        .status(400)
        .json({ error: true, details: error.details, message: error.message });
    }

    const updatedAuthor = await updateAuthorById(
      Number(id),
      value as CreateAuthorRequest
    );

    return res.status(200).json(updatedAuthor);
  } catch (error: any) {
    return res.status(500).json({
      error: true,
      message: "Author not updated. Please try again.",
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
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

    const deleteInfo = await deleteAuthorById(Number(id));

    return res.status(200).json(deleteInfo);
  } catch (error: any) {
    return res.status(500).json({
      error: true,
      message: "Author not deleted. Please try again.",
    });
  }
};
