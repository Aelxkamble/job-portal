import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name) {
      next("Name is required");
    }
    if (!email) {
      next("Email is required");
    }
    if (!password) {
      next("Password is required and greater than  6 characters");
    }
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      next("Email already exists");
    }
    const user = await userModels.create({
      name,
      email,
      password,
    });
    res.status(201).send({
      message: "User Registered Successfully",
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
