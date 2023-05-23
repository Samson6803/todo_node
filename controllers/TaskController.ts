import { Request, Response } from "express";
import TaskService from "../services/TaskService";
import TaskValidator from "../utils/TaskValidator";
import { taskDTO } from "../services/TaskService";

const TaskController = {
  addTask: async (req: Request, res: Response) => {
    const userId = req.session.userId;
    const taskDTO: taskDTO = {
      userId: Number(userId),
      title: req.body.title,
      description: req.body.description,
    };
    const validationResult = TaskValidator.validateTask(taskDTO);
    if (!validationResult) {
      res.status(400).json({
        error: "Validation didn't succeed",
      });
      return;
    }
    const task = await TaskService.addTask(taskDTO);
    console.log(task);
    res.status(200).json({
      task: task,
    });
  },
  getTasks: async (req: Request, res: Response) => {
    const userId = req.session.userId;
    const tasks = await TaskService.getTasks(Number(userId));
    if (tasks?.length == 0)
      res.status(404).json({
        error: "No tasks found for this user",
      });
    res.status(200).json({
      tasks: tasks,
    });
  },
  getTask: async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const userId = req.session.userId;
    if (!(typeof taskId === "number"))
      res.status(400).json({
        error: "Incorrect taskId",
      });
    const task = TaskService.getTask(Number(userId), Number(taskId));
    res.status(200).json({
      task: task,
    });
  },
};

export default TaskController;
