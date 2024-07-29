import { db } from "../../db/db";
import {
  AuthorsWithBooksResponse,
  AuthorWithBooks,
  CreateAuthorRequest,
} from "../../types";

export const saveAuthor = async (data: CreateAuthorRequest) => {
  return await db("authors").insert(data);
};

export const findAllAuthors = async (limit: number, page: number) => {
  return await db("authors")
    .select("*")
    .limit(limit)
    .offset(limit * page);
};

export const findSingleAuthor = async (id: number) => {
  return await db("authors").where({ id }).first();
};

export const findSpecificAuthorBooks = async (authorId: number) => {
  return await db("books").where({ author_id: authorId }).select("*");
};

export const findAuthorDetailWithBooks = async (authorId: number) => {
  const author = await db("authors").where({ id: authorId }).first();
  if (!author) {
    throw new Error("Author not found");
  }
  const books = await db("books").where({ author_id: authorId }).select("*");

  return { ...author, books };
};

export const findAuthorsWithBooks = async () => {
  const authorsWithBooks = await db("authors")
    .join("books", "authors.id", "books.author_id")
    .select(
      "authors.id as author_id",
      "authors.name as author_name",
      "authors.bio",
      "authors.birth_date",
      "books.id as book_id",
      "books.title as book_title",
      "books.description as book_description",
      "books.published_date"
    );

  const result: AuthorWithBooks[] = authorsWithBooks.reduce(
    (acc: AuthorWithBooks[], row: AuthorsWithBooksResponse) => {
      let author = acc.find((a) => a.id === row.author_id);
      if (!author) {
        author = {
          id: row.author_id,
          name: row.author_name,
          bio: row.bio,
          birth_date: row.birth_date,
          books: [],
        };
        acc.push(author);
      }
      if (row.book_id) {
        author.books.push({
          id: row.book_id,
          title: row.book_title,
          description: row.book_description,
          published_date: row.published_date,
        });
      }
      return acc;
    },
    []
  );

  // sorting by author id in ascending order
  return result.sort((a, b) => a.id - b.id);
};
// search author by author name
export const findAuthorsLike = async (name: string) => {
  return await db("authors").where("name", "like", `%${name}%`).select("*");
};

export const updateAuthorById = async (
  id: number,
  data: CreateAuthorRequest
) => {
  return await db("authors").where({ id }).update(data);
};

export const deleteAuthorById = async (id: number) => {
  return await db("authors").where({ id }).delete();
};
