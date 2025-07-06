import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/response.utils";
import { sendOtp, verifyOtp } from "./otp.service";

export async function SendOTP(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    res.status(400).json(errorResponse("Phone number is required"));
    return;
  }

  try {
    await sendOtp(email);

    res.status(200).json(successResponse("OTP sent successfully"));
  } catch (error) {
    console.error("Error sending OTP", error);
    res.status(500).json(errorResponse("Error sending OTP", error));
  }
}

export async function VerifyOTP(req: Request, res: Response) {
  const { email, otp } = req.body;

  if (!email && !otp) {
    res
      .status(400)
      .json(errorResponse("Phone number and OTP both are required"));
    return;
  }

  try {
    const isValidOtp = await verifyOtp(email, otp);
    if (!isValidOtp) {
      res.status(403).json(errorResponse("Invalid OTP"));
      return;
    }

    res.status(200).json(successResponse("OTP verified successfully"));
  } catch (error) {
    console.error("OTP not verified", error);
    res.status(500).json(errorResponse("OTP not verified", error));
  }
}
