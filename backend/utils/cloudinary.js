import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileUrl, options) => {
  try {
    if (!fileUrl) return null;

    const response = await cloudinary.uploader.upload(fileUrl, {
      ...options,
    });
    // console.log("File uploaded to cloudinary", response.url);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteOnCloudinary = async (resumeId, options) => {
  try {
    if (!resumeId) return null;

    const response = await cloudinary.uploader.destroy(resumeId, {
      ...options,
    });
    // console.log("File deleted from cloudinary", response);
    return response;
  } catch (error) {
    return error;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
