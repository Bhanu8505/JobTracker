import axios from "axios";
import { ApiError } from "../utils/api-error.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { responseHandler } from "../utils/responseHandler.js";
import fs from "fs";

export const uploadResume = async (req, res, next) => {
  try {
    const user = req.user;
    const forceReplace = req.query.force === "true";
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }
    // console.log("MIME type : ", req.file.mimetype);

    const localPath = req.file.path;
    if (user.resume?.url && !forceReplace) {
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
      return responseHandler(
        res,
        409,
        "Resume already exists. Add ?force=true to replace it."
      );
    }

    const uploadOptions = {
      folder: "resumes",
      resource_type: "raw",
    };

    const cloudResponse = await uploadOnCloudinary(localPath, uploadOptions);
    // console.log(cloudResponse);

    if (!cloudResponse) {
      throw new ApiError(500, "Failed to upload to cloudinary", cloudResponse);
    }

    if (cloudResponse && fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    if (user.resume?.public_id && forceReplace) {
      const deleteOptions = {
        resource_type: "raw",
      };
      await deleteOnCloudinary(user.resume.public_id, deleteOptions);
      console.log("Deleted Resume from cloudonary");
    }

    user.resume = {
      url: cloudResponse.secure_url,
      public_id: cloudResponse.public_id,
      mimetype: req.file.mimetype,
      uploadedAt: new Date(),
    };
    await user.save();

    responseHandler(res, 200, "Resume uploaded to Cloudinary", user.resume);
  } catch (error) {
    next(error);
  }
};

export const downloadResume = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.resume?.url) {
      throw new ApiError(404, "Resume not uploaded");
    }

    const resumeUrl = user.resume.url;
    const fileName = `${user.username}_resume.pdf`;

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader(
      "Content-Type",
      user.resume.mimetype || "application/octet-stream"
    );

    const fileStream = await axios({
      method: "get",
      url: resumeUrl,
      responseType: "stream",
    });

    fileStream.data.pipe(res);
  } catch (error) {
    next(error);
  }
};

export const viewResume = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.resume?.url) {
      throw new ApiError(404, "Resume not uploaded");
    }

    const resumeUrl = user.resume.url;

    const fileResponse = await axios({
      method: "get",
      url: resumeUrl,
      responseType: "stream",
    });

    res.setHeader("Content-Type", user.resume.mimetype || "application/pdf");

    fileResponse.data.pipe(res);
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.resume?.public_id) {
      throw new ApiError(404, "No Resume found");
    }
    const deleteOptions = {
      resource_type: "raw",
    };

    const result = await deleteOnCloudinary(
      user.resume.public_id,
      deleteOptions
    );

    // console.log(result);

    if (!result || result.result !== "ok") {
      throw new ApiError(500, "Could not delete resume");
    }

    user.resume = {
      url: null,
      public_id: null,
      mimetype: null,
      uploadedAt: null,
    };

    await user.save();

    responseHandler(res, 200, "Resume deleted successfully");
  } catch (error) {
    next(error);
  }
};
