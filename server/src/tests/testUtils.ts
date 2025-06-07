import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Truncate all tables in the test database.
 * Add more tables as needed.
 */
export async function resetDatabase() {
  await prisma.$transaction([
    prisma.transaction.deleteMany({}),
    prisma.wallet.deleteMany({}),
    prisma.user.deleteMany({}),
  ]);
}

export default prisma;

