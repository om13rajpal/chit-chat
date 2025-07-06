import { Request, Response } from "express";
import { IUser } from "./user.interface";
import { errorResponse, successResponse } from "../../utils/response.utils";
import { loginUser, registerUser } from "./user.service";
import welcomeQueue from "../../config/queue.config";
import { hashPassword } from "../../utils/password.utils";
import { generateLoginToken } from "../../utils/token.utils";

export async function RegisterUser(req: Request, res: Response) {
  const payload: IUser = req.body;

  try {
    payload.password = await hashPassword(payload.password);

    const user = await registerUser(payload);
    if (!user) {
      res.status(400).json(errorResponse("Error registering user"));
      return;
    }

    await welcomeQueue.add(
      "welcomeEmail",
      {
        username: payload.username,
        email: payload.email,
      },
      {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 3000,
        },
      }
    );

    res.status(201).json(successResponse("User registered successfully", user));
  } catch (error) {
    console.error("Error registering the user", error);
    res.status(500).json(errorResponse("Error registering the user", error));
  }
}

export async function LoginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const isValidCredential = loginUser(username, password);
    if (!isValidCredential) {
      res.status(403).json(errorResponse("Invalid credentials"));
      return;
    }

    const userToken = generateLoginToken(username);

    res
      .status(200)
      .json(successResponse("User logged in successfully", userToken));
  } catch (error) {
    console.error("Error logging in the user", error);
    res.status(500).json(errorResponse("Error logging in the user", error));
  }
}
