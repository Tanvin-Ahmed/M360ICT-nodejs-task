import { CreateBookRequest } from "../../types";
import { db } from "../../db/db";

export const saveNewBook = async (data: CreateBookRequest) => {
  const { title, description, published_date, author_id } = data;
  const query = `INSERT INTO books (title, description, published_date, author_id)
    VALUES (?, ?, ?, ?)`;

  return await db.execute(query, [
    title,
    description,
    published_date,
    author_id,
  ]);
};

export const findSingleBookById = async (id: string | number) => {
  const query = `SELECT * FROM books WHERE id = ?`;

  return await db.execute(query, [id]);
};

export const findAllBooks = async () => await db.query(`SELECT * FROM books`);

export const updateBookById = async (
  id: string | number,
  data: CreateBookRequest
) => {
  const { title, description, published_date, author_id } = data;
  const query = `UPDATE books SET title = ?, description = ?, published_date = ?, author_id = ? WHERE id = ?`;

  return await db.execute(query, [
    title,
    description,
    published_date,
    author_id,
    id,
  ]);
};

export const deleteBookById = async (id: string | number) => {
  const query = `DELETE FROM books WHERE id = ?`;
  return await db.execute(query, [id]);
};
