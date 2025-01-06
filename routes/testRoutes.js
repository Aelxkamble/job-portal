import express from "express";
import { testController } from "../controllers/testController.js";

//router object
const router = express.Router();

//routes
router.post("/test-post", testController);

//export
export default router;
