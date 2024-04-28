import express from "express";

import { createBook } from "./bookController";

const bookRouter = express.Router();

// routes
bookRouter.post("/register", createBook);

// bookRouter.post("/login", loginUser);

export default bookRouter;
