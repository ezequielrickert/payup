import { PrismaClient } from '@prisma/client';
import {PrismaUserRepository} from "../repository/adapter/prisma/PrismaUserRepository";
import {PrismaWalletRepository} from "../repository/adapter/prisma/PrismaWalletRepository";
import {PrismaTransactionRepository} from "../repository/adapter/prisma/PrismaTransactionRepository";

export function createPrismaClient() {
  return new PrismaClient();
}

export function createUserRepository(prisma: PrismaClient) {
  return new PrismaUserRepository(prisma);
}
export function createWalletRepository(prisma: PrismaClient) {
  return new PrismaWalletRepository(prisma);
}
export function createTransactionRepository(prisma: PrismaClient) {
  return new PrismaTransactionRepository(prisma);
}

/**
    * Resets the database by truncating all tables and resetting their IDs.
    * Accepts a PrismaClient instance.
 */
export async function resetDatabase(prisma: PrismaClient) {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Transaction", "Wallet", "User" RESTART IDENTITY CASCADE;
  `);
}
