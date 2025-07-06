import express from "express";
import adapter from "./config/bullmq.config";
import {
  InternalServerError,
  PageNotFound,
} from "./middlewares/error.middleware";
import { NODE_ENV } from "./config/env.config";
import morgan from "morgan";

const app = express();

if (NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/health", (req, res) => {
  res.send("Email microservice is working");
});

app.use("/admin/queues", adapter.getRouter());

app.use(PageNotFound);
app.use(InternalServerError);

export default app;
