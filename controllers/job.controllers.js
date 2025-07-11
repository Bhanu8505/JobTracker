import { Job } from "../models/Job.model.js";
import { ApiError } from "../utils/api-error.js";
import { responseHandler } from "../utils/responseHandler.js";

export const createJob = async (req, res, next) => {
  try {
    const { title, description, company, jobLocation, positionType } = req.body;
    const userID = req.user._id;

    if (!title || !description || !company || !jobLocation || !positionType) {
      throw new ApiError(400, "Invalid Details");
    }

    const job = await Job.create({
      title,
      description,
      company,
      jobLocation,
      positionType,
      userID,
    });

    responseHandler(res, 201, "Job created Successfully", job);
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const userID = req.user._id;

    const jobs = await Job.find({ userID });
    if (jobs.length === 0) {
      throw new ApiError(404, "No Jobs Found");
    }

    responseHandler(res, 200, "Jobs Fetched", jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userID = req.user._id;

    if (!jobId) {
      throw new ApiError(400, "Invalid job");
    }

    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, "Job not Found");
    }

    if (job.userID.toString() !== userID.toString()) {
      throw new ApiError(403, "Unauthorized User");
    }

    responseHandler(res, 200, "Job Found", job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  const allowedUpdates = [
    "title",
    "description",
    "company",
    "status",
    "jobLocation",
    "note",
    "positionType",
  ];
  try {
    const { jobId } = req.params;
    const userID = req.user._id;
    const fieldsToBeUpdated = req.body;

    if (!jobId) {
      throw new ApiError(400, "Missing Job Info");
    }

    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, "No Job Found");
    }

    if (job.userID.toString() !== userID.toString()) {
      throw new ApiError(403, "Not Authorized to update this job");
    }

    for (let key of Object.keys(req.body)) {
      if (!allowedUpdates.includes(key)) {
        throw new ApiError(400, "Incorrect data");
      }
    }

    Object.assign(job, fieldsToBeUpdated);
    await job.save();

    responseHandler(res, 200, "Job Updated successfully", job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userID = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, "No Job Found");
    }

    if (job.userID.toString() !== userID.toString()) {
      throw new ApiError(403, "Not Authorized to delete this job");
    }

    await job.deleteOne();

    responseHandler(res, 200, "Job deleted successfully");
  } catch (error) {
    next(error);
  }
};
