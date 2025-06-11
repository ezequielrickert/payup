import { User as PrismaUser } from '@prisma/client';  // Obtains the Type that Prisma generates and handles
import { prismaClient as defaultPrismaClient } from '../../../lib/prisma'; // Obtains the Singleton Client
import { User } from '../../../domain/adapter/User';
import { IUserRepository } from '../../port/IUserRepository';
import { IUser } from "../../../domain/port/IUser";

export class PrismaUserRepository implements IUserRepository {
    private readonly prismaClient;

    constructor(prismaClient = defaultPrismaClient) {
        this.prismaClient = prismaClient;
    }

    // This method is never used
    async findById(id: string): Promise<IUser | null> {
        const user = await this.prismaClient.user.findUnique({ where: { id: parseInt(id, 10) } });
        return user ? this.prismaToDomain(user) : null;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await this.prismaClient.user.findUnique({ where: { email } });
        return user ? this.prismaToDomain(user) : null;
    }

    async save(user: IUser): Promise<void> {
        await this.prismaClient.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                cvu: user.cvu
            },
        });
    }

    private prismaToDomain(prismaUser: PrismaUser): IUser {
        return new User(prismaUser.name, prismaUser.email, prismaUser.password, prismaUser.cvu);
    }
}