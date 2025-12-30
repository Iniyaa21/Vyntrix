import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
    
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      const error = new Error("Authentication required");
      error.statusCode = 401; 
      throw error;
    }

    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      const error = new Error("You do not have permission to access this user's details");
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findById(req.params.id).select("-password"); 

    if (!user) {
        const error = new Error("User does not exist"); 
        error.statusCode = 404; 
        throw error; 
    }

    res.status(200).json({
      success: true,
      data: user,
    });
    
  } catch (error) {
    next(error);
  }
};
