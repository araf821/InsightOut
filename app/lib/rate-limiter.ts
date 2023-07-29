import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const chatRateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "7 s"),
  prefix: "@upstash/ratelimit",
});

export const templateRateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
  prefix: "@upstash/ratelimit",
});
