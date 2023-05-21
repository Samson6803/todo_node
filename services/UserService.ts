import query from "../database/database";
import bcrypt from "bcrypt";

export interface registerDTO {
  name: string;
  email: string;
  password: string;
}

const UserService = {
  register: async (registerDTO: registerDTO) => {
    const queryResult = await query.getUser(registerDTO.email);
    if (queryResult.count != 0) throw new Error("Email is occupied");
    const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
    return query.addUser({
      name: registerDTO.name,
      email: registerDTO.email,
      password: hashedPassword,
    });
  },
};

export default UserService;
