import express from "express";
import client from "prom-client";
import messageRouter from "./routes/route";
import { NODE_ENV } from "./config/env.config";
import morgan from "morgan";

const app = express();
app.use(express.json());

app.use("/v1/message", messageRouter);

if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const register = new client.Registry();

client.collectDefaultMetrics({ register });

app.get("/health", (req, res) => {
  res.send("message microservice is running");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

export default app;
