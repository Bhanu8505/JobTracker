import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/job.controllers.js";
import { jobCreationValidation } from "../validators/index.js";

const jobRouter = Router();

jobRouter.route("/job").post(jobCreationValidation(), createJob);

jobRouter.route("/job").get(getAllJobs);

jobRouter.route("/job/:jobId").get(getJobById);

jobRouter.route("/job/:jobId").patch(updateJob);

jobRouter.route("/job/:jobId").delete(deleteJob);

export default jobRouter;
