import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

interface UsersProps {
  id?: string;
  username: string;
  password: string;
}

const prisma = new PrismaClient();

// const users: Array<UsersProps> = [{ id: 1, username: "admin", password: "admin" }];

export const getAllUsers = async () => {
  await prisma.$connect();

  const users = await prisma.users.findMany({
    where: { active: true },
  });

  await prisma.$disconnect();
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

export const editUser = async (id: string, username?: string, password?: string) => {
  await prisma.$connect();

  await prisma.users.update({
    where: { id },
    data: { username: username, password: password },
  });

  await prisma.$disconnect();

  return;
  //   const userFind = users.find(user => user.id === id);
  //   console.log(userFind);
  //   return userFind;
};

export const disableUser = async (id: string) => {
  await prisma.$connect();

  await prisma.users.update({
    where: { id },
    data: { active: false },
  });

  await prisma.$disconnect();

  return;
};

export const removeUser = async (id: string) => {
  await prisma.$connect();

  await prisma.users.delete({
    where: { id },
  });

  await prisma.$disconnect();

  return;
};
