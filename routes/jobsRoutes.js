import express from "express";
import userAuth from "../middlewars/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsControllers,
  getJobStatsController,
  updateJobController,
} from "../controllers/jobsControllers.js";

const router = express.Router();

//routes
//CREATE JOB||POST
router.post("/create-job", userAuth, createJobController);

//GET JOBS || GET
router.get("/get-jobs", userAuth, getAllJobsControllers);

//UPDATE JOBS || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DElETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

//JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, getJobStatsController);
export default router;
