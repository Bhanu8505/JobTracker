import { Router } from "express";
import {
  deleteResume,
  downloadResume,
  uploadResume,
  viewResume,
} from "../controllers/resume.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const resumeRouter = Router();

resumeRouter.route("/upload").post(upload.single("resume"), uploadResume);

resumeRouter.route("/download").get(downloadResume);

resumeRouter.route("/view").get(viewResume);

resumeRouter.route("/delete_resume").delete(deleteResume);

export default resumeRouter;
