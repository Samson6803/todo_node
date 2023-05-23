import "dotenv/config";
import express, { json, urlencoded } from "express";
import UserRoutes from "./routes/UserRoutes";
import cookieParser from "cookie-parser";
import createSessionConfig from "./config/sessionConfig";

async function startApp() {
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use((await createSessionConfig())!);

  app.use(UserRoutes);

  app.listen(process.env.APP_PORT!, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`);
  });
}
startApp().catch(console.error);
