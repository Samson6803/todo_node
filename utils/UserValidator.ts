import JOI from "joi";
import { registerDTO, loginDTO } from "../services/UserService";

const emailJOI = JOI.string().email({ minDomainSegments: 2 }).required();
const nameJOI = JOI.string()
  .pattern(/^[a-zA-Z]+$/)
  .required();
const passwordJOI = JOI.string().min(5).required();

const registerDTOSchema = JOI.object({
  email: emailJOI,
  name: nameJOI,
  password: passwordJOI,
});

const loginDTOSchema = JOI.object({
  email: emailJOI,
  password: passwordJOI,
});

const UserValidator = {
  validateRegister: (registerUserDTO: registerDTO) => {
    const validationResult = registerDTOSchema.validate(registerUserDTO);
    if (validationResult.error) return false;
    return true;
  },
  validateLogin: (loginUserDTO: loginDTO) => {
    const validationResult = loginDTOSchema.validate(loginUserDTO);
    if (validationResult.error) return false;
    return true;
  },
};

export default UserValidator;
