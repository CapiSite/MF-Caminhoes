import { PrismaClient } from '@prisma/client';

export let prismaDb: PrismaClient;

export function connectDb(): void {
  prismaDb = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prismaDb?.$disconnect();
}