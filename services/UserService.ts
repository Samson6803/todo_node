import userRepo from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export interface registerDTO {
  name: string;
  email: string;
  password: string;
}

export interface loginDTO {
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
  login: async (loginDTO: loginDTO) => {
    const user = await userRepo.getUser(loginDTO.email);
    if (user == null) throw new Error("There is no such user");
    const compareResult = await bcrypt.compare(
      loginDTO.password,
      user.password!
    );
    if (!compareResult) throw new Error("Incorrect password or email");
    return user;
  },
};

export default UserService;
