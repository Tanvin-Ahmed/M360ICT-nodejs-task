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

export const updateBookById = async (id: number, data: CreateBookRequest) => {
  return await db("books").where({ id }).update(data);
};

export const deleteBookById = async (id: number) => {
  return await db("books").where({ id }).delete();
};
