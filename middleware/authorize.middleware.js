const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = new Error("You do not have admin privileges");
    error.statusCode = 403;
    return next(error); 
  }

  next();
};

export default authorizeAdmin;
