import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userAdmin = { username: "admin", password: "admin" };

async function main() {
  await prisma.users.create({
    data: userAdmin,
  });
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
