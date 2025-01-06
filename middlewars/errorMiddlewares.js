const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .send({ message: "Internal Server Error", success: false, err });
};
export default errorMiddleware;
