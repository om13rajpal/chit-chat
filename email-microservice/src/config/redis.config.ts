import Redis from "ioredis";
import { REDIS_URL } from "./env.config";

const redis = new Redis(REDIS_URL!, {
  maxRetriesPerRequest: null
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

export default redis;
