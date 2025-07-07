import { Request, Response } from "express";
import prisma from "../config/prisma.config";

export async function getMessages(req: Request, res: Response) {
  const { id, userId } = req.body;

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: id, receiverId: userId },
          { senderId: userId, receiverId: id },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages", error);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error,
    });
  }
}
