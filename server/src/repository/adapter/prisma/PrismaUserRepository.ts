import { User as PrismaUser } from '@prisma/client';  // Obtains the Type that Prisma generates and handles
import { prismaClient } from '../../../lib/prisma'; // Obtains the Singleton Client
import { User } from '../../../domain/adapter/User';
import { IUserRepository } from '../../port/IUserRepository';
import {IUser} from "../../../domain/port/IUser";

export class PrismaUserRepository implements IUserRepository {

    async findById(id: string): Promise<IUser | null> {
        const user = await prismaClient.user.findUnique({ where: { id: Number(id) } });
        return user ? this.prismaToDomain(user) : null;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await prismaClient.user.findUnique({ where: { email } });
        return user ? this.prismaToDomain(user) : null;
    }

    // ID is created and stored by Prisma ORM
    async save(user: IUser): Promise<void> {
        await prismaClient.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                cvu: user.cvu
            },
        });
    }

    // This method is used to convert the PrismaUser object to the User object from our domain
    private prismaToDomain(prismaUser: PrismaUser): IUser {
        // Here the prisma user pasess the cvu to create the user todo
        return new User(prismaUser.name, prismaUser.email, prismaUser.password, prismaUser.cvu);
    }
}
