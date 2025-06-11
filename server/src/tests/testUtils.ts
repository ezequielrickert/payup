import { PrismaClient } from '@prisma/client';
import {PrismaUserRepository} from "../repository/adapter/prisma/PrismaUserRepository";
import {PrismaWalletRepository} from "../repository/adapter/prisma/PrismaWalletRepository";

const prisma = new PrismaClient();
export let userRepository = new PrismaUserRepository(prisma);
export let walletRepository = new PrismaWalletRepository(prisma);



/**
    * Resets the database by truncating all tables and resetting their IDs.
 */
export async function resetDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Transaction", "Wallet", "User" RESTART IDENTITY CASCADE;
  `);
}

export default prisma;

