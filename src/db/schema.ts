import { constantVariables } from "../config/variables";
import { db } from "./db";

const createDatabaseAndTables = async () => {
  try {
    // Create the database if it doesn't exist
    await db.raw(
      `CREATE DATABASE IF NOT EXISTS ${constantVariables.db_schema}`
    );

    // Switch to the newly created database
    await db.raw(`USE ${constantVariables.db_schema}`);

    // Create the tables
    if (!(await db.schema.hasTable("authors"))) {
      await db.schema.createTable("authors", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.text("bio");
        table.date("birth_date").notNullable();
      });
      console.log("Author table created successfully");
    }

    if (!(await db.schema.hasTable("books"))) {
      await db.schema.createTable("books", (table) => {
        table.increments("id").primary();
        table.string("title", 255).notNullable();
        table.text("description");
        table.date("published_date").notNullable();
        table
          .integer("author_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("authors");
      });
      console.log("Book table created successfully");
    }
  } catch (error) {
    console.error("Error creating database and tables:", error);
  }
};

export default createDatabaseAndTables;
