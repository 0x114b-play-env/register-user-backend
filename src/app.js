import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

const errorHandler = (err, req, res, next) => {
  console.error("🚨 Error caught:", err);

  let statusCode = err?.statusCode || 500;
  let message = err?.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

import studentRouter from "./routes/student.routes.js";

app.use("/student", studentRouter);

app.use(errorHandler);

export default app;
