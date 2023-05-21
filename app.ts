import "dotenv/config";
import express, { json, urlencoded } from "express";
import UserController from "./controllers/UserController";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
app.use(json({}));
app.use(urlencoded({}));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 },
    resave: false,
  })
);
const port = 3030;

app.post("/api/register", (req, res) => {
  UserController.register(req, res);
});

app.listen(port);
