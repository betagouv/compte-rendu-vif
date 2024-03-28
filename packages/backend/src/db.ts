import { PrismaClient } from "@prisma/client";
import { isDev } from "./envVars";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (isDev) globalForPrisma.prisma = prisma;
