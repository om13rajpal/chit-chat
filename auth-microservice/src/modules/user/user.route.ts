import { Router } from "express";
import { ValidateInput } from "../../middleware/validateInput.middleware";
import { userSchema } from "./user.zod";
import { LoginUser, RegisterUser } from "./user.controller";

const userRouter = Router();

userRouter.post("/register", ValidateInput(userSchema), RegisterUser);
userRouter.post("/login", LoginUser);

export default userRouter;