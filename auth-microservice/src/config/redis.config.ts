import Redis from "ioredis";
import { REDIS_URL } from "./env.config";

const redis = new Redis(REDIS_URL!);

redis.on("connect", () => {
  console.log("Connected to redis");
});

export default redis;
