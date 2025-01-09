import express from "express";
import userAuth from "../middlewars/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

//routes
//GET USERS || GET

//UPDATE USERS || PUT
router.put("/update-user", userAuth, updateUserController);
export default router;
