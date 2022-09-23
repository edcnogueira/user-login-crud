import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const users: Array<UsersProps> = [{ id: 1, username: "admin", password: "admin" }];

export const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    where: { active: true },
  });

  await prisma.$disconnect();
  return users;
};

export const addUsers = async (username: string, password: string) => {
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
  await prisma.users.update({
    where: { id },
    data: { username: username, password: password },
  });

  await prisma.$disconnect();

  return;
};

export const disableUser = async (id: string) => {
  await prisma.users.update({
    where: { id },
    data: { active: false },
  });

  await prisma.$disconnect();

  return;
};

export const removeUser = async (id: string) => {
  await prisma.users.delete({
    where: { id },
  });

  await prisma.$disconnect();

  return;
};
