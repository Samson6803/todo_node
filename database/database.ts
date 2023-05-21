import db from "./dbConnection";

interface User {
  name: string;
  email: string;
  password: string;
}

const query = {
  getUser: async (email: string) => {
    const result = await db<User[]>`SELECT * FROM users WHERE email = ${email}`;
    return result;
  },
  addUser: async (user: User) => {
    const result = db`INSERT INTO users(name, email, password) VALUES ${user.name}, ${user.email}, ${user.password}
            RETURNING id, email`;
    return result;
  },
};

export default query;
