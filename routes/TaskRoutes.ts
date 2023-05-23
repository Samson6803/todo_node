import { Router } from "express";
import TaskController from "../controllers/TaskController";

const router = Router();

router.get("/api/tasks", TaskController.getTasks);
router.get("/api/tasks/:taskId", TaskController.getTask);
router.post("/api/tasks", TaskController.addTask);

export default router;
