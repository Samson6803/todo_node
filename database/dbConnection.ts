import postgres from "postgres";
const env = process.env;

const db = postgres({
  port: 5432,
  database: env.DB_NAME!,
  username: env.DB_USERNAME!,
  password: env.DB_PASSWORD!,
});

export default db;
