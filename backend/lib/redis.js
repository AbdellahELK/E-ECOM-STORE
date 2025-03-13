import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

console.log('Redis URL:', process.env.UPSTASH_REDIS_URL ? 'Loaded' : 'Not Loaded');

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
    maxRetriesPerRequest: null,
    tls: {}
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err.message);
});

await redis.set('foo', 'bar');
