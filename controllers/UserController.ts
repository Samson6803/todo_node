import { Request, Response } from "express";
import UserService, { registerDTO, loginDTO } from "../services/UserService";
import UserValidator from "../utils/UserValidator";

const UserController = {
  register: async (request: Request, response: Response) => {
    const registerUserDTO: registerDTO = {
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
    };

    const validationResult = UserValidator.validateRegister(registerUserDTO);
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

  login: async (request: Request, response: Response) => {
    const loginUserDTO: loginDTO = {
      email: request.body.email,
      password: request.body.password,
    };

    const validationResult = UserValidator.validateLogin(loginUserDTO);
    if (!validationResult) {
      return response.status(400).json({
        error: "Incorrect user data, validation didn't succeed",
      });
    }

    try {
      const user = await UserService.login(loginUserDTO);
      request.session.userId = user.id;
      return response.status(200).json({
        name: user.name,
        email: user.email,
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
