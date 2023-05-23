import TaskRepo from "../repositories/TaskRepository";

export interface taskDTO {
  userId: number;
  title: string;
  description: string;
}

const TaskService = {
  getTask: async (userId: number, taskId: number) => {
    try {
      const task = await TaskRepo.getTask(taskId);
      if (task?.userId != userId) throw new Error("No such task for this user");
      return task;
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
  getTasks: async (userId: number) => {
    try {
      const tasks = await TaskRepo.getTasks(userId);
      return tasks;
    } catch (e: any) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
  addTask: async (taskDTO: taskDTO) => {
    try {
      const result = await TaskRepo.addTask(taskDTO);
      return result;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
};

export default TaskService;
