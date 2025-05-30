import { Wallet as PrismaWallet } from '@prisma/client';
import { prismaClient } from '../../../lib/prisma';
import { Wallet } from '../../../domain/adapter/Wallet';
import { IWalletRepository } from '../../port/IWalletRepository';
import { IWallet } from '../../../domain/port/IWallet';

export class PrismaWalletRepository implements IWalletRepository {
    async findByUserId(userId: number): Promise<IWallet | null> {
        const wallet = await prismaClient.wallet.findUnique({ where: { userId } });
        return wallet ? this.prismaToDomain(wallet) : null;
    }

    async findByUserCvu(userCvu: number): Promise<IWallet | null> {
       // const wallet = await prismaClient.wallet.findUnique({ where: { userCvu } });
        // return wallet ? this.prismaToDomain(wallet) : null; todo
        return null
    }

    async save(wallet: IWallet): Promise<void> {
        await prismaClient.wallet.create({
            data: {
                userId: wallet.userId,
                // userCvu: wallet.userCvu, todo
                balance: wallet.balance
            },
        });
    }

    async update(wallet: IWallet): Promise<void> {
        await prismaClient.wallet.update({
            where: { userId: wallet.userId },
            data: { balance: wallet.balance },
        });
    }

    private prismaToDomain(prismaWallet: PrismaWallet): IWallet {
        // return new Wallet(prismaWallet.userId, prismaWallet.userCvu, prismaWallet.balance); todo
        return new Wallet(prismaWallet.userId, 123, prismaWallet.balance);

    }
}

