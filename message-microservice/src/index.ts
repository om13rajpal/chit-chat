import http from "http";
import app from "./app";
import { PORT } from "./config/env.config";
import { WebSocket, WebSocketServer } from "ws";
import prisma from "./config/prisma.config";

const server = http.createServer(app);
const wss = new WebSocketServer({
  server,
});

export interface Socket extends WebSocket {
  userId?: number;
}

const clients = new Map<number, Socket>();

wss.on("connection", (ws: Socket) => {
  ws.on("message", async (message: any) => {
    const data = JSON.parse(message);
    if (data.type === "register") {
      ws.userId = data.id;
      clients.set(data.id, ws);
      console.log(`User ${data.id} registered`);
    }

    if (data.type === "message") {
      const receiverSocket = clients.get(data.to);
      const message = data.message;

      const payload = JSON.stringify({
        from: ws.userId,
        message,
      });

      await prisma.message.create({
        data: {
          senderId: ws.userId!,
          receiverId: data.to,
          content: message,
        },
      });

      if (receiverSocket) {
        receiverSocket.send(payload);
      } else {
        console.warn(`User ${data.to} is not connected.`);
      }
    }
  });

  ws.on("close", () => {
    if (ws.userId !== undefined) clients.delete(ws.userId);
    console.log(`User ${ws.userId} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});

server.on("error", (err) => {
  console.log("Server failed", err);
  process.exit(1);
});
