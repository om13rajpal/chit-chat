import express from "express";
import { NODE_ENV } from "./config/env.config";
import morgan from "morgan";
import {
  InternalServerError,
  PageNotFound,
} from "./middleware/error.middleware";
import router from "./routes/route";
import client from "prom-client";

const app = express();

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

app.use(express.json());
app.use("/v1", router);

if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/health", (req, res) => {
  res.send("Auth microservice is up");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use(PageNotFound);
app.use(InternalServerError);

export default app;
