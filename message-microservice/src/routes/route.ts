import { Router } from "express";
import { getMessages } from "../controllers/message.controller";

const messageRouter = Router()

messageRouter.get("/", getMessages)

export default messageRouter