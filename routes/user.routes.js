import { Router } from "express";
import { getUsers, getUser, deleteUser } from "../controllers/user.controller.js";
import authenticate from "../middleware/authenticate.middleware.js";
import authorizeAdmin from "../middleware/authorize.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticate, authorizeAdmin, getUsers);

userRouter.get("/:id", authenticate, getUser);

userRouter.put("/:id", (req, res) => {
  res.send({
    title: "UPDATE user",
  });
});

userRouter.delete("/:id", authenticate, deleteUser);

export default userRouter;
