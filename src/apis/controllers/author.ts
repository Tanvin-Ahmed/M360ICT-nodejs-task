import { Request, Response } from "express";
import {
  deleteAuthorById,
  findAllAuthors,
  findSingleAuthor,
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

    const author = await findSingleAuthor(id);

    if (!author) {
      return res.status(404).json({ error: true, message: "No author found" });
    }

    return res.status(200).json(author);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "Author not found" });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body;

    //   validate data
    const { error, value } = authorSchema.validate(data);
    if (error) {
      return res
        .status(400)
        .json({ error: true, details: error.details, message: error.message });
    }

    const updatedAuthor = await updateAuthorById(
      id,
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

    const deleteInfo = await deleteAuthorById(id);

    return res.status(200).json(deleteInfo);
  } catch (error: any) {
    return res.status(500).json({
      error: true,
      message: "Author not deleted. Please try again.",
    });
  }
};
