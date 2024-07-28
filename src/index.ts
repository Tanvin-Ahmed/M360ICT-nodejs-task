import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

import "./db/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("server listening on port " + port));
