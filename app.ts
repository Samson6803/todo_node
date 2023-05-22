import "dotenv/config";
import express, { json, urlencoded } from "express";
import UserRouter from "./routes/UserRouter";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 5,
      sameSite: true,
    },
    resave: false,
  })
);

app.use(UserRouter);

app.listen(process.env.APP_PORT!, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});
