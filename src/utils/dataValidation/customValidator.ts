import { CustomHelpers } from "joi";
import { db } from "../../db/db";

// Define the custom validator for author_id
export const validateAuthorId = async (
  value: number,
  helpers: CustomHelpers
) => {
  const rows = await db("authors").select("id").where({ id: value });

  if (rows.length === 0) {
    return helpers.error("any.invalid", {
      message: "Author ID does not exist",
    });
  }
  return value;
};
