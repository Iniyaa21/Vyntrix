import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

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
      const error = new Error(
        "You do not have permission to access this user's details"
      );
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

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      const error = new Error(
        "You do not have permission to delete this user's details"
      );
      error.statusCode = 403;
      throw error;
    }
    const userIdToDelete = req.params.id;
    await Subscription.deleteMany({ user: userIdToDelete });
    const deletedUser = await User.findByIdAndDelete(userIdToDelete);

    if (!deletedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userIdToUpdate = req.params.id;

    if (req.user.id !== userIdToUpdate && req.user.role !== "admin") {
      const error = new Error(
        "You do not have permission to update this user's details"
      );
      error.statusCode = 403;
      throw error;
    }

    if (Object.keys(req.body).length === 0) {
      const error = new Error("No fields provided for update");
      error.statusCode = 400;
      throw error;
    }

    const forbiddenFields = [
      "password",
      "role",
      "_id",
      "createdAt",
      "updatedAt",
    ];

    const hasForbiddenField = forbiddenFields.some(
      (field) => field in req.body
    );

    if (hasForbiddenField) {
      const error = new Error(
        "Some fields can't be updated using this endpoint"
      );
      error.statusCode = 400;
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userIdToUpdate,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User has been updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
