import { CustomHelpers } from "joi";
import { db } from "../../db/db";
import { SingleAuthorResponse } from "../../types";

// Define the custom validator for author_id
export const validateAuthorId = async (
  value: number,
  helpers: CustomHelpers
) => {
  const response = await db.query("SELECT id FROM authors WHERE id = ?", [
    value,
  ]);
  const rows = response[0] as SingleAuthorResponse[];

  if (rows?.length === 0) {
    return helpers.error("any.invalid", {
      message: "Author ID does not exist",
    });
  }
  return value;
};
