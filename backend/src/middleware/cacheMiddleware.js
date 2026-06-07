const NodeCache = require('node-cache');

// Create a new cache instance with a standard TTL of 60 seconds
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

const cacheMiddleware = (req, res, next) => {
  // Use the requested URL as the cache key
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log(`Cache hit for ${key}`);
    return res.json(cachedResponse);
  }

  console.log(`Cache miss for ${key}`);
  
  // Override res.json to intercept the response and cache it
  const originalJson = res.json;
  res.json = (body) => {
    // Only cache successful responses
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, body);
    }
    // Call the original res.json
    originalJson.call(res, body);
  };

  next();
};

module.exports = cacheMiddleware;
