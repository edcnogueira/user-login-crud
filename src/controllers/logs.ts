import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const logs = async (action: string, id: string) => {
  await prisma.logs.create({
    data: {
      action: action,
      userId: id,
    },
  });

  await prisma.$disconnect();
};
