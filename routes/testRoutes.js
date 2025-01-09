import express from "express";
import { testController } from "../controllers/testController.js";
import userAuth from "../middlewars/authMiddleware.js";

//router object
const router = express.Router();

//routes
router.post("/test-post", userAuth, testController);

//export
export default router;
