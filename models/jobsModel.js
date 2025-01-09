import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company Name is required"],
    },
    position: {
      type: String,
      required: [true, "Job Position is required"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contraract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Mumbai",
      required: [true, "Work Location is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
