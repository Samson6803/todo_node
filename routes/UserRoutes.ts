import { Router } from "express";
import UserController from "../controllers/UserController";
import { authenticate } from "../middleware/Authentication";

const router = Router();

router.post("/api/user/login", UserController.login);
router.post("/api/user/register", UserController.register);
router.use(authenticate);
router.get("/api/user/logout", UserController.logout);
router.get("/api/user/me", UserController.me);

export default router;
