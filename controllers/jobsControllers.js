import mongoose from "mongoose";
import jobsModel from "../models/jobsModel.js";
import moment from "moment/moment.js";

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("All fields are required");
  }
  req.body.createdBy = req.user.userId;
  //create job
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

export const getAllJobsControllers = async (req, res, next) => {
  const jobs = await jobsModel.find({
    createdBy: req.user.userId,
  });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  //find job
  const job = await jobsModel.findOne({ _id: id });
  // validation
  if (!job) {
    next(`Job not found with this is ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    return next(`Your Not authorized to update this job`);
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateJob });
};

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  // validation
  if (!job) {
    next(`Job not found with this is ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    return next(`Your Not authorized to delete this job`);
  }
  await job.deleteOne();
  res.status(200).json({ message: "Job deleted successfully" });
};

export const getJobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    //search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  //default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  //monthly yearly stats
  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totalStats: stats.length, defaultStats, monthlyApplication });
};
