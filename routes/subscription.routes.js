import { Router } from "express";
import authenticate from "../middleware/authenticate.middleware.js";
import authorizeAdmin from "../middleware/authorize.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
  getSubscriptions,
  getSubscriptionDetails,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authenticate, authorizeAdmin, getSubscriptions);

subscriptionRouter.get("/:id", authenticate, getSubscriptionDetails);

subscriptionRouter.post("/", authenticate, createSubscription);

subscriptionRouter.patch("/:id", authenticate, updateSubscription);

subscriptionRouter.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  deleteSubscription,
);

subscriptionRouter.get("/user/:id", authenticate, getUserSubscriptions);

subscriptionRouter.patch("/:id/cancel", authenticate, cancelSubscription);

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    title: "GET upcoming renewals",
  });
});

export default subscriptionRouter;
