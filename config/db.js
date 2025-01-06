import mongoose from "mongoose";
const MONGO_URL =
  process.env.MONGO_URL ||
  `mongodb+srv://akashkamble965:Balaji569@cluster0.mslntjk.mongodb.net/jobportal`;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`MongoDB ERROR:${error}`.bgRed.white);
  }
};
export default connectDB;
