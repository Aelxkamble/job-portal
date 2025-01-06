import express from "express";
import { registerController } from "../controllers/authControllers.js";

//router object
const router = express.Router();

//routes
router.post("/register", registerController);

//export
export default router;
