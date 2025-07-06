import { Router } from "express";
import { SendOTP, VerifyOTP } from "./otp.controller";

const otpRouter = Router();

otpRouter.post("/send", SendOTP);
otpRouter.post("/verify", VerifyOTP);

export default otpRouter