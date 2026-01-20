import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptions = async (req, res, next) => {
  try {
    // extra defensive check for admin role
    if (req.user.role !== "admin") {
      const error = new Error("You do not have admin privileges");
      error.statusCode = 403;
      throw error;
    }
    const subscriptions = await Subscription.find();
    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }
    const subscriptionOwnerId = subscription.user.toString();

    if (req.user.id !== subscriptionOwnerId && req.user.role !== "admin") {
      const error = new Error(
        "You do not have permission to access this subscription details",
      );
      error.statusCode = 403;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    const subscriptionOwnerId = subscription.user.toString();

    if (req.user.id !== subscriptionOwnerId && req.user.role !== "admin") {
      const error = new Error(
        "You do not have permission to update this subscription's details",
      );
      error.statusCode = 403;
      throw error;
    }

    if (Object.keys(req.body).length === 0) {
      const error = new Error("No fields provided for update");
      error.statusCode = 400;
      throw error;
    }

    const allowedFields = ["status", "paymentMethod"];

    const hasForbiddenField = Object.keys(req.body).some(
      (field) => !allowedFields.includes(field),
    );

    if (hasForbiddenField) {
      const error = new Error(
        "Only payment method and status are allowed to be updated",
      );
      error.statusCode = 400;
      throw error;
    }

    if (req.body.status) {
      const allowedStatusTransitions = {
        active: ["cancelled"],
        cancelled: [],
        expired: [],
      };
      const currentStatus = subscription.status;
      const nextStatus = req.body.status;

      const allowedNextStatuses = allowedStatusTransitions[currentStatus] || [];

      if (!allowedNextStatuses.includes(nextStatus)) {
        const error = new Error(
          `Cannot change subscription status from '${currentStatus}' to '${nextStatus}'`,
        );
        error.statusCode = 400;
        throw error;
      }
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Subscription has been updated successfully",
      data: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }
    await subscription.deleteOne();

    res.status(200).json({
      success: true,
      message: "Subscription has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
