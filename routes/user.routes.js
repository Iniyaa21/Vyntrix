import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authenticate from "../middleware/authenticate.middleware.js";
import authorizeAdmin from "../middleware/authorize.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticate, authorizeAdmin, getUsers);

userRouter.get("/:id", authenticate, authorizeAdmin, getUser);

userRouter.post("/", (req, res) => {
  res.send({
    title: "CREATE new user",
  });
});

userRouter.put("/:id", (req, res) => {
  res.send({
    title: "UPDATE user",
  });
});

userRouter.delete("/:id", (req, res) => {
  res.send({
    title: "DELETE user",
  });
});

export default userRouter;
