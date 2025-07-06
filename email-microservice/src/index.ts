import http from "http";
import app from "./app";
import { PORT } from "./config/env.config";

import './config/env.config'
import './config/redis.config'
import './config/bullmq.config'
import './config/mail.config'
import './worker/worker'

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error", err);
  process.exit(1);
});
