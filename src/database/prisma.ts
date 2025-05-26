import { PrismaClient } from "@prisma/client";

//instância do prisma
export const prisma = new PrismaClient({
  log: ["query"],
});

