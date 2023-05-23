import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

async function createSessionConfig() {
  try {
    const redisClient = createClient();
    await redisClient.connect();
    const redisStore = new RedisStore({
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

    return sessionConfig;
  } catch (e: any) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}
export default createSessionConfig;
