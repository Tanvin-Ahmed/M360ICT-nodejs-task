import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import "./db/db";
import authorRouter from "./apis/router/author";
import bookRouter from "./apis/router/book";
import { db } from "./db/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

// Connect to the database and start the server
db.raw("select 1+1 as result")
  .then(() => {
    console.log("Database connected");
    // const port = process.env.PORT || 8080;
    // app.listen(port, () => console.log("server listening on port " + port));
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  });

export { app };
