import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";

const app = express();

// Routes
app.get("/", (req, res, next) => {
  res.json({ message: "welcome to master api session" });
});

app.use(globalErrorHandler);

export default app;
