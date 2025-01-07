import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {
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
  //token
  const token = user.createJWT();
  res.status(201).send({
    message: "User Registered Successfully",
    success: true,
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Email and Password are required");
  }

  //find user by email
  const user = await userModels.findOne({ email }).select("+password");
  if (!user) {
    next("Invail email and password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    next("Invail email and password");
  }
  user.password = undefined;
  //token
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login successfully",
    user: {},
    token,
  });
};
