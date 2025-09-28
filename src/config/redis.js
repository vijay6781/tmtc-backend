import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URI || "redis://localhost:6379",
});

client.on("error", (err) => console.error("Redis Client Error", err));

await client.connect();

export default client;
