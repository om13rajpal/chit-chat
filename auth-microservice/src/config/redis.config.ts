import Redis from "ioredis";
import { REDIS_URL } from "./env.config";

const redis = new Redis(REDIS_URL!)
export default redis