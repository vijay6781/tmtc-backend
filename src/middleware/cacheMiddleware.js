import client from "../config/redis.js";

export const cache = (keyPrefix) => async (req, res, next) => {
  try {
    const key = `${keyPrefix}:${req.user._id}`;
    const cached = await client.get(key);
    console.log("Checking Redis Cache 🚀", key);

    if (cached) {
      console.log("Serving from Redis Cache 🚀");
      return res.json(JSON.parse(cached));
    }

    // override res.json to store in cache
    res.sendResponse = res.json;
    res.json = (data) => {
      console.log("Storing in Redis Cache 🚀", data);
      client.setEx(key, 15, JSON.stringify(data)); // cache for 600s
      res.sendResponse(data);
    };

    next();
  } catch (error) {
    console.error("Cache error:", error);
    next();
  }
};
