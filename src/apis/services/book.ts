import { CreateBookRequest } from "../../types";
import { db } from "../../db/db";

export const saveNewBook = async (data: CreateBookRequest) => {
  return await db("books").insert(data);
};

export const findSingleBookById = async (id: number) => {
  return await db("books").where({ id }).first();
};

export const findAllBooks = async (limit: number, page: number) => {
  return await db("books")
    .select("*")
    .limit(limit)
    .offset(limit * page);
};

export const findAllBookOfAnAuthor = async (authorId: number) => {
  return await db("books").where({ author_id: authorId }).select("*");
};

export const findBookDetailWithAuthor = async (bookId: number) => {
  return await await db("books")
    .join("authors", "books.author_id", "authors.id")
    .select(
      "books.id as book_id",
      "books.title as book_title",
      "books.description as book_description",
      "books.published_date",
      "authors.id as author_id",
      "authors.name as author_name",
      "authors.bio",
      "authors.birth_date"
    )
    .where("books.id", bookId)
    .first();
};

export const updateBookById = async (id: number, data: CreateBookRequest) => {
  return await db("books").where({ id }).update(data);
};

export const deleteBookById = async (id: number) => {
  return await db("books").where({ id }).delete();
};
