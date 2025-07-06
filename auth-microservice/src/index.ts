import http from "http";
import app from "./app";
import { PORT } from "./config/env.config";
import "./config/env.config";
import "./config/prisma.config";
import "./config/redis.config";
import "./config/queue.config";
import "./config/mail.config";

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
