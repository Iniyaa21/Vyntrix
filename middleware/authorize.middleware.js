const authorizeAdmin =  (req, res, next) => {
  try {
    if (req.user.role !== "admin"){
        const error = new Error("You do not have admin privileges");
        error.statusCode = 403; 
        throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authorizeAdmin;