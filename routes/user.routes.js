import { Router } from "express";
import { getUsers, getUser, deleteUser, updateUser, updatePassword } from "../controllers/user.controller.js";
import authenticate from "../middleware/authenticate.middleware.js";
import authorizeAdmin from "../middleware/authorize.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticate, authorizeAdmin, getUsers);

userRouter.get("/:id", authenticate, getUser);

userRouter.patch("/:id", authenticate, updateUser);

userRouter.delete("/:id", authenticate, deleteUser);

userRouter.patch("/:id/password", authenticate, updatePassword);

export default userRouter;
