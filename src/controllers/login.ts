import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret: any = process.env.SECRET;

export const login = async (username: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: { username: username },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });

  if (!user) {
    return false;
  }

  if (user.password === password) {
    const token = jwt.sign({ id: user.id, user: user.username }, secret, {
      expiresIn: 300,
    });
    return token;
  }

  return { message: "invalid password" };
};
