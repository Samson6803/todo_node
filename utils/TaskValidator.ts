import Joi from "joi";
import { taskDTO } from "../services/TaskService";

const taskDTOSchema = Joi.object({
  userId: Joi.number().required(),
  title: Joi.string().min(5).required(),
  description: Joi.string().min(5).required(),
});

const TaskValidator = {
  validateTask: (taskDTO: taskDTO) => {
    const validationResult = taskDTOSchema.validate(taskDTO);
    if (validationResult.error) {
      return false;
    }
    return true;
  },
};

export default TaskValidator;
