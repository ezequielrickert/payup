import { Wallet as PrismaWallet } from '@prisma/client';
import { prismaClient } from '../../../lib/prisma';
import { Wallet } from '../../../domain/adapter/Wallet';
import { IWalletRepository } from '../../port/IWalletRepository';
import { IWallet } from '../../../domain/port/IWallet';

export class PrismaWalletRepository implements IWalletRepository {
    async findByUserCvu(userCvu: number): Promise<IWallet | null> {
        const wallet = await prismaClient.wallet.findUnique({ where: { userId: userCvu } });
        return wallet ? this.prismaToDomain(wallet) : null;
    }

    async save(wallet: IWallet): Promise<void> {
        await prismaClient.wallet.create({
            data: {
                userId: wallet.userCvu,
                balance: wallet.balance
            },
        });
    }

    async update(wallet: IWallet): Promise<void> {
        await prismaClient.wallet.update({
            where: { userId: wallet.userCvu },
            data: { balance: wallet.balance },
        });
    }

    private prismaToDomain(prismaWallet: PrismaWallet): IWallet {
        return new Wallet(prismaWallet.userCvu, prismaWallet.balance);
    }
}

