import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import "./db/db";
import authorRouter from "./apis/router/author";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/authors", authorRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("server listening on port " + port));
