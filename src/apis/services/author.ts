import { db } from "../../db/db";
import { CreateAuthorRequest } from "../../types";

export const saveAuthor = async (data: CreateAuthorRequest) => {
  const { bio, birth_date, name } = data;

  const query = `INSERT INTO authors (name, bio, birth_date)
    VALUES (?, ?, ?)`;

  return await db.execute(query, [name, bio, birth_date]);
};

export const findAllAuthors = async () => {
  const query = `SELECT * FROM authors`;

  return await db.query(query);
};

export const findSingleAuthor = async (id: string) => {
  const query = `SELECT * FROM authors WHERE id = ?`;

  return await db.query(query, [id]);
};

export const updateAuthorById = async (
  id: string | number,
  data: CreateAuthorRequest
) => {
  const { name, bio, birth_date } = data;
  const query = `UPDATE authors SET name = ?, bio = ?, birth_date = ? WHERE id = ?`;

  return await db.execute(query, [name, bio, birth_date, id]);
};

export const deleteAuthorById = async (id: string | number) => {
  const query = `DELETE FROM authors WHERE id = ?`;

  return await db.execute(query, [id]);
};
