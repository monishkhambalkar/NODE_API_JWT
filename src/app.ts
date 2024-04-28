import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./user/userRouter";
import bodyParser from "body-parser";

const app = express();

// app.use(express.json());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res, next) => {
  res.json({ message: "welcome to master api session" });
});

app.use("/api/users", userRouter);

app.use(globalErrorHandler);

export default app;
