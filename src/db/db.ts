import mysql from "mysql2/promise";
import { constantVariables } from "../config/variables";

export const db = mysql.createPool({
  host: constantVariables.db_host,
  user: constantVariables.db_user,
  password: constantVariables.db_password,
  port: 3306,
});

(async () => {
  try {
    // Create the schema if it doesn't exist
    const createSchema = `CREATE DATABASE IF NOT EXISTS ${constantVariables.db_schema}`;
    await db.execute(createSchema);
    // Use the newly created schema
    await db.query(`USE ${constantVariables.db_schema}`);

    //   create author table if not exist
    const createAuthor = `CREATE TABLE IF NOT EXISTS authors (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        bio LONGTEXT,
                        birth_date DATE NOT NULL
                        );`;
    await db.execute(createAuthor);

    //   create book table if not exist
    const createBook = `CREATE TABLE IF NOT EXISTS books (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        description LONGTEXT,
                        published_date DATE NOT NULL,
                        author_id INT NOT NULL,
                        FOREIGN KEY (author_id) REFERENCES authors(id)
                        );`;
    await db.execute(createBook);
  } catch (error: any) {
    console.log(error);
  }
})();
