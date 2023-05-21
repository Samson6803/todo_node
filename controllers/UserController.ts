import { Request, Response } from "express";
import UserService, { registerDTO } from "../services/UserService";
import UserValidator from "../utils/UserValidator";

const UserController = {
  register: async (request: Request, response: Response) => {
    const registerUserDTO: registerDTO = {
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
    };

    const validationResult = UserValidator.validate(registerUserDTO);
    if (!validationResult) {
      return response.status(400).json({
        error: "Incorrect user data, validation didn't succeed",
      });
    }

    try {
      const user = await UserService.register(registerUserDTO);
      return response.status(200).json({
        user,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        return response.status(400).json({
          error: e.message,
        });
      }
    }
  },
};

export default UserController;
