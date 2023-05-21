import postgres from "postgres";
const env = process.env;

const db = postgres({
  port: env.DB_PORT as unknown as number,
  database: env.DB_NAME!,
  username: env.DB_USERNAME!,
  password: env.DB_PASSWORD!,
  host: "localhost",
});

export default db;
