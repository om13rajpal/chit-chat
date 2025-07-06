import { Router } from "express";
import userRouter from "../modules/user/user.route";
import otpRouter from "../modules/otp/otp.route";

const router = Router();

router.use("/user", userRouter);
router.use("/otp", otpRouter);

export default router;
