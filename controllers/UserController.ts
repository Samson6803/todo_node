import { Request, Response } from "express";
import UserService, { registerDTO } from "../services/UserService";
import JOI from "joi";

const UserController = {
  register: async (request: Request, response: Response) => {
    const registerUserDTO: registerDTO = {
      email: request.body.email,
      name: request.body.name,
      password: request.body.password,
    };

    const schema = JOI.object({
      email: JOI.string().email({ minDomainSegments: 2 }),
      name: JOI.string().pattern(/^[a-zA-Z]+$/),
      password: JOI.string().min(5),
    });
    const schemaResult = schema.validate(registerUserDTO);
    if (schemaResult.error) {
      return response.status(400).json({
        error: schemaResult.error,
      });
    }

    try {
      const user = await UserService.register(registerUserDTO);
      return response.json({
        user,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      return response.status(500).json({ error: true });
    }
  },
};

export default UserController;
