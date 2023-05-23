import db from "../config/dbConnection";

interface User {
  email: string;
  name: string;
  password: string;
}
const UserRepository = {
  addUser: async (user: User) => {
    try {
      const result =
        await db`INSERT INTO tasks(name, email, password) VALUES (${user.name}, ${user.email}, ${user.password})
                RETURNING name, email`;
      return result;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  },
  getUser: async (email: string) => {
    const user = await db`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) return null;
    return {
      id: user[0]?.id,
      email: user[0]?.email,
      name: user[0]?.name,
      password: user[0]?.password,
    };
  },
};

export default UserRepository;
