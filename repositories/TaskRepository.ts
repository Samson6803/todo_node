import db from "../config/dbConnection";
import { taskDTO } from "../services/TaskService";

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
}

const TaskRepository = {
  addTask: async (task: taskDTO) => {
    try {
      const result =
        await db`INSERT INTO tasks(users_id, title, description) VALUES(${task.userId}, ${task.title}, ${task.description})
            RETURNING title, description`;
      return result;
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
  getTask: async (taskId: number) => {
    try {
      const task = await db`SELECT * FROM tasks WHERE id=${taskId}`;
      if (task.length == 0) return null;
      return {
        id: task[0]?.id,
        userId: task[0]?.userId,
        title: task[0]?.name,
        description: task[0]?.description,
      };
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
  getTasks: async (userId: number) => {
    try {
      const tasks = await db`SELECT * FROM tasks WHERE users_id=${userId}`;
      if (tasks.length == 0) return null;
      return tasks;
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
};

export default TaskRepository;
