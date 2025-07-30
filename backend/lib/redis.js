import { createClient } from "redis"
import dotenv from 'dotenv'
dotenv.config()
export const redis = createClient({
    url: process.env.UPSTASH_REDIS_URL
});

await redis.connect()
