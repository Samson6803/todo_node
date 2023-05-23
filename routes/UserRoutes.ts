import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/api/user/login", UserController.login);
router.post("/api/user/register", UserController.register);
router.get("/api/user/logout", UserController.logout);
router.get("/api/user/me", UserController.me);

export default router;
