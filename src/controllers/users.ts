import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

interface UsersProps {
  id: string | number;
  username: string;
  password: string;
}

const prisma = new PrismaClient();

const users: Array<UsersProps> = [{ id: 1, username: "admin", password: "admin" }];

export const getAllUsers = () => {
  return users;
};

export const addUsers = async (username: string, password: string) => {
  await prisma.$connect();

  await prisma.users.create({
    data: {
      username: username,
      password: password,
    },
  });

  await prisma.$disconnect();

  return;
};

export const editUser = (id: string) => {
  const userFind = users.find(user => user.id === id);
  console.log(userFind);
  return userFind;
};
