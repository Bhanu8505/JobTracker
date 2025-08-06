import { Job } from "../models/Job.model.js";
import { ApiError } from "../utils/api-error.js";
import { responseHandler } from "../utils/responseHandler.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      company,
      status,
      jobLocation,
      note,
      positionType,
    } = req.body;
    const userID = req.user._id;
    if (!req.user.isActive) {
      throw new ApiError(400, "Invalid User");
    }

    if (
      !title ||
      !description ||
      !company ||
      !status ||
      !jobLocation ||
      !positionType
    ) {
      if (!title) console.log("No title");
      if (!description) console.log("No description");
      if (!company) console.log("No company");
      if (!status) console.log("No status");
      if (!jobLocation) console.log("No jobLocation");
      if (!positionType) console.log("No positionType");
      throw new ApiError(400, "Invalid Details");
    }

    const job = await Job.create({
      title,
      description,
      company,
      status,
      jobLocation,
      note,
      positionType,
      userID,
    });

    responseHandler(res, 201, "Job created Successfully", job);
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  const allowedSort = [
    "title",
    "description",
    "company",
    "status",
    "jobLocation",
    "note",
    "positionType",
    "createdAt",
    "updatedAt",
  ];
  try {
    const userID = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortQuery = req.query.sort || "createdAt";
    const sortFields = sortQuery.split(",");

    const sortOptions = {};
    for (const field of sortFields) {
      const order = field.startsWith("-") ? -1 : 1;
      const fieldName = field.replace(/^-/, "");
      if (!allowedSort.includes(fieldName)) {
        throw new ApiError(400, "Invalid query");
      }
      sortOptions[fieldName] = order;
    }

    if (!req.user.isActive) {
      throw new ApiError(400, "Invalid User");
    }

    const jobs = await Job.find({ userID })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

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

    if (!req.user.isActive) {
      throw new ApiError(400, "Invalid User");
    }

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
    const { title, description, company, status, jobLocation, positionType } =
      req.body;

    if (!req.user.isActive) {
      throw new ApiError(400, "Invalid User");
    }

    if (!jobId) {
      throw new ApiError(400, "Missing Job Info");
    }

    if (
      !title ||
      !description ||
      !company ||
      !status ||
      !jobLocation ||
      !positionType
    ) {
      if (!title) console.log("No title");
      if (!description) console.log("No description");
      if (!company) console.log("No company");
      if (!status) console.log("No status");
      if (!jobLocation) console.log("No jobLocation");
      if (!positionType) console.log("No positionType");
      throw new ApiError(400, "Invalid Details");
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

    if (!req.user.isActive) {
      throw new ApiError(400, "Invalid User");
    }

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
