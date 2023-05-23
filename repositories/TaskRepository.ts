import db from "../config/dbConnection";

interface Task {
  userId: number;
  name: string;
  description: string;
}

const TaskRepository = {
  addTask: async (task: Task) => {
    try {
      const result =
        await db`INSERT INTO tasks(users_id, name, description) VALUES(${task.userId}, ${task.name}, ${task.description})
            RETURNING name, description`;
      return result;
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
  getTask: async (taskId) => {
    try {
      const task = await db`SELECT * FROM tasks WHERE id=${taskId}`;
      if (task.length == 0) return null;
      return {
        id: task[0].id,
        userId: task[0].userId,
        name: task[0].name,
        description: task[0].description,
      };
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
  getTasks: async (userId) => {
    try {
      const tasks = await db`SELECT * FROM tasks WHERE userId=${userId}`;
      if (tasks.length == 0) return null;
      return tasks;
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
};
