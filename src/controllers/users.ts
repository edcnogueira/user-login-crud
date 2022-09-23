import { v4 as uuidv4 } from "uuid";

const users: Array<object> = [];

export const getAllUsers = () => {
  return users;
};

export const addUsers = (username: string, password: string) => {
  users.push({
    id: uuidv4(),
    username: username,
    password: password,
  });

  return users;
};
