// This file is used to create a Prisma client instance that is a Singleton for the Backend.

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export { prismaClient };
