import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (username: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: { username: username },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    return false;
  }

  if (user.password === password) {
    return true;
  }

  return { message: "invalid password" };
};
