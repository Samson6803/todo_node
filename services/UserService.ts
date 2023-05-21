import userRepo from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export interface registerDTO {
  name: string;
  email: string;
  password: string;
}

const UserService = {
  register: async (registerDTO: registerDTO) => {
    const user = await userRepo.getUser(registerDTO.email);
    if (user != null) throw new Error("Email is occupied");
    const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
    return userRepo.addUser({
      name: registerDTO.name,
      email: registerDTO.email,
      password: hashedPassword,
    });
  },
};

export default UserService;
