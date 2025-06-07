import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
    * Resets the database by truncating all tables and resetting their IDs.
 */
export async function resetDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Transaction", "Wallet", "User" RESTART IDENTITY CASCADE;
  `);
}

export default prisma;

