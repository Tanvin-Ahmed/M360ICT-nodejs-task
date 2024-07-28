import { Request, Response } from "express";
import {
  deleteAuthorById,
  findAllAuthors,
  findSingleAuthor,
  saveAuthor,
  updateAuthorById,
} from "../services/author";
import { authorSchema } from "../../utils/dataValidation/dataValidator";
import { CreateAuthorRequest, SingleAuthorResponse } from "../../types";

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
    const createdAuthor = await saveAuthor(value);

    return res.status(201).json(createdAuthor);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: true, message: "Author not created. Please try again." });
  }
};

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await findAllAuthors();

    return res.status(200).json(authors[0]);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No author exist." });
  }
};

export const getSingleAuthor = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id as string;

    const author = await findSingleAuthor(id);
    const authorDataArray = author[0] as SingleAuthorResponse[];

    return res.status(200).json(authorDataArray[0]);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "Author not found" });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body as CreateAuthorRequest;

    const updatedAuthor = await updateAuthorById(id, data);

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
