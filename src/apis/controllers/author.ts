import { Request, Response } from "express";
import {
  deleteAuthorById,
  findAllAuthors,
  findAuthorByEmail,
  findAuthorDetailWithBooks,
  findAuthorsLike,
  findAuthorsWithBooks,
  findSingleAuthor,
  findSpecificAuthorBooks,
  saveAuthor,
  updateAuthorById,
} from "../services/author";
import {
  authorSchema,
  isNumber,
  isString,
  loginSchema,
} from "../../utils/dataValidation/dataValidator";
import { CreateAuthorRequest } from "../../types";
import {
  comparePassword,
  generateHash,
  generateToken,
} from "../../utils/helper/auth";

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

    // check if email already exists
    const existingAuthor = await findAuthorByEmail(value.email);
    if (existingAuthor) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
    }

    // generate hash password
    const password = await generateHash(value.password);

    //   save the author data to the database
    const createdAuthor = await saveAuthor({
      ...value,
      password,
    } as CreateAuthorRequest);
    const authorId = createdAuthor[0];

    // generate token
    const token = generateToken({ id: authorId, email: value.email });

    // save token to db
    await updateAuthorById(authorId, { token });

    return res.status(201).json({ token });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: true, message: "Registration failed. Please try again." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // validate login credentials
    const { error, value } = loginSchema.validate(data);
    if (error) {
      return res.status(400).json({ error: true, message: error.message });
    }

    const author = await findAuthorByEmail(value.email);
    if (!author) {
      return res.status(404).json({
        error: true,
        message: "Email not found. Please register first.",
      });
    }

    const isPasswordCorrect = await comparePassword(
      value.password,
      author.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: true,
        message: "Wrong credentials. Please try again with valid credentials.",
      });
    }

    // generate new token
    const token = generateToken({ id: author.id, email: author.email });
    // save new token to db
    await updateAuthorById(author.id, { token });

    return res.status(200).json({ token });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: true, message: "Login failed. Please try again." });
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

export const searchAuthors = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;

    const { error, value } = isString.validate(name);
    if (error) {
      return res.status(400).json({ error: true, message: error.message });
    }

    const searchResult = await findAuthorsLike(value);

    return res.status(200).json(searchResult);
  } catch (error: any) {
    return res.status(404).json({ error: true, message: "No author found" });
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
