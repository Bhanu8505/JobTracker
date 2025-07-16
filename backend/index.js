import express, { json } from "express";

import dotenv from "dotenv";
import { db } from "./utils/db.js";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/auth.routes.js";
import jobRouter from "./routes/job.routes.js";
import { isLoggedIn } from "./middlewares/isLoggedIn.middlware.js";
import resumeRouter from "./routes/resume.router.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["CONTENT-TYPE", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to your own JobTracker 🔥");
});

db();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", isLoggedIn, jobRouter);
app.use("/api/v1/resume", isLoggedIn, resumeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
