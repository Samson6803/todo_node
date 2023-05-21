import "dotenv/config";
import express, { json, urlencoded } from "express";
import UserController from "./controllers/UserController";

const app = express();
app.use(json({}));
app.use(urlencoded({}));
const port = 3030;

app.post("/api/register", (req, res) => {
  UserController.register(req, res);
});

app.listen(port);
