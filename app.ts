import "dotenv/config";
import express, { json, urlencoded } from "express";
import UserController from "./controllers/UserController";
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

app.post("/api/register", (req, res) => {
  UserController.register(req, res);
});

app.post("/api/login", (req, res) => {
  UserController.login(req, res);
});

app.use((req, res, next) => {
  if (!req.session || !req.session.userId) {
    res.status(401);
    next(new Error("Unauthorized"));
  }
  next();
});

app.listen(process.env.APP_PORT!, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});
