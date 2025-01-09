import JWT from "jsonwebtoken";
const jwtSecreteKey =
  process.env.JWT_SECRET || "ABCDEFHHIJKLMNO@#$%&1234567890";
const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Hello1");
    next("Auth Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, jwtSecreteKey);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.log("Hello2");
    next("Auth Failed");
  }
};
export default userAuth;
