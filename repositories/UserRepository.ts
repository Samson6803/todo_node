import db from "../config/dbConnection";

interface User {
  email: string;
  name: string;
  password: string;
}
const UserRepository = {
  addUser: async (user: User) => {
    const result =
      await db`INSERT INTO users(name, email, password) VALUES (${user.name}, ${user.email}, ${user.password})
                RETURNING name, email`;
    return result;
  },
  getUser: async (email: string) => {
    const user = await db`SELECT * FROM users WHERE email = ${email}`;
    if (user.count === 1) return user;
    return null;
  },
};

export default UserRepository;
