import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

const redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "app",
});

const sessionConfig = session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET!,
  saveUninitialized: false,
  resave: false,
  store: redisStore,
  cookie: {
    maxAge: 1000 * 60 * 5,
    sameSite: true,
  },
});

export default sessionConfig;
