import { Queue } from "bullmq";
import redis from "./redis.config";

const welcomeQueue = new Queue("emailQueue", { connection: redis });
export default welcomeQueue;
