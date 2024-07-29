import { db } from "../../db/db";
import { CreateAuthorRequest } from "../../types";

export const saveAuthor = async (data: CreateAuthorRequest) => {
  return await db("authors").insert(data);
};

export const findAllAuthors = async (limit: number, page: number) => {
  return await db("authors")
    .select("*")
    .limit(limit)
    .offset(limit * page);
};

export const findSingleAuthor = async (id: string) => {
  return await db("authors").where({ id }).first();
};

export const updateAuthorById = async (
  id: string | number,
  data: CreateAuthorRequest
) => {
  return await db("authors").where({ id }).update(data);
};

export const deleteAuthorById = async (id: string | number) => {
  return await db("authors").where({ id }).delete();
};
