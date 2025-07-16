import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Rejected", "Interested", "Scheduled", "Selected"],
      default: "Interested",
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    positionType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"],
      default: "Full-Time",
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model("Job", jobSchema);
