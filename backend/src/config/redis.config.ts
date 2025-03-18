import Redis from "ioredis";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a Redis instance using the URL from environment variables
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
	throw new Error('REDIS_URL environment variable is not defined');
}
const redis = new Redis(redisUrl, {
    tls: { rejectUnauthorized: false }, // Required for Upstash
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    connectTimeout: 10000
  },
);
redis.on('error', (err) => console.log('Redis Client Error', err));

export default redis;