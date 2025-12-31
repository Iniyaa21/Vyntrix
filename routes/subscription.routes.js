import { Router } from "express";
import authenticate from "../middleware/authenticate.middleware.js";
import authorizeAdmin from "../middleware/authorize.middleware.js";
import { createSubscription, getUserSubscriptions, getSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authenticate, authorizeAdmin, getSubscriptions);

subscriptionRouter.get("/:id", (req, res) => {
  res.send({
    title: "GET subscription details",
  });
});

subscriptionRouter.post("/", authenticate, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({
    title: "UPDATE subscription",
  });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({
    title: "DELETE subscription",
  });
});

subscriptionRouter.get("/user/:id", authenticate, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    title: "CANCEL subscription",
  });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    title: "GET upcoming renewals",
  });
});

export default subscriptionRouter;
