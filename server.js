//packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
//files import
import connectDB from "./config/db.js";
//routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewars/errorMiddlewares.js";
//config
dotenv.config({ path: "./config" });
//Mongodb Connection
connectDB();

//rest object
const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);

//validation middleware
app.use(errorMiddleware);

//listen
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || "development";
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${DEV_MODE} Mode  on port no ${PORT}`.bgCyan.white
  );
});
