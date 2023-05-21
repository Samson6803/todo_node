import JOI from "joi";
import { registerDTO } from "../services/UserService";

const registerDTOSchema = JOI.object({
  email: JOI.string().email({ minDomainSegments: 2 }).required(),
  name: JOI.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  password: JOI.string().min(5).required(),
});

const UserValidator = {
  validate: (registerUserDTO: registerDTO) => {
    const validationResult = registerDTOSchema.validate(registerUserDTO);
    if (validationResult.error) {
      return false;
    }
    return true;
  },
};

export default UserValidator;
