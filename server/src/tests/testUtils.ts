import { PrismaClient } from '@prisma/client';
import {PrismaUserRepository} from "../repository/adapter/prisma/PrismaUserRepository";
import {PrismaWalletRepository} from "../repository/adapter/prisma/PrismaWalletRepository";
import {PrismaTransactionRepository} from "../repository/adapter/prisma/PrismaTransactionRepository";

const prisma = new PrismaClient();

export function createUserRepository() {
  return new PrismaUserRepository(prisma);
}
export function createWalletRepository() {
  return new PrismaWalletRepository(prisma);
}
export function createTransactionRepository() {
  return new PrismaTransactionRepository(prisma);
}

/**
    * Resets the database by truncating all tables and resetting their IDs.
 */
export async function resetDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Transaction", "Wallet", "User" RESTART IDENTITY CASCADE;
  `);
}

export default prisma;
