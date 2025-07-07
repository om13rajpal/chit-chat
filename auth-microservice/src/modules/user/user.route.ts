import { Router } from "express";
import { ValidateInput } from "../../middleware/validateInput.middleware";
import { userSchema } from "./user.zod";
import { GetUsers, LoginUser, RegisterUser } from "./user.controller";
import { getUsers } from "./user.service";

const userRouter = Router();

userRouter.post("/register", ValidateInput(userSchema), RegisterUser);
userRouter.post("/login", LoginUser);
userRouter.get("/all/:id", GetUsers);

export default userRouter;