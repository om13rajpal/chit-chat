import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { Queue } from "bullmq";
import redis from "./redis.config";

const adapter = new ExpressAdapter();

const emailQueue = new Queue("emailQueue", {
  connection: redis,
});

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter: adapter,
});

adapter.setBasePath("/admin/queues")

export default adapter
