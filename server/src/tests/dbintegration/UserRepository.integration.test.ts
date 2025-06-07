import prisma, { resetDatabase } from '../testUtils';

describe('UserRepository integration tests', () => {
  beforeAll(async () => {
    // Optionally, run migrations or db push here if needed
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  it('should save and find a user by id', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepassword',
        cvu: 1234567890,
      },
    });
    const foundUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(foundUser).not.toBeNull();
    expect(foundUser?.name).toBe(user.name);
    expect(foundUser?.email).toBe(user.email);
  });

  it('should return null when finding by non-existent id', async () => {
    const foundUser = await prisma.user.findUnique({ where: { id: 99999 } });
    expect(foundUser).toBeNull();
  });

  // todo: tira ror

  it('should find a user by email', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'securepassword',
        cvu: 1234567890,
      },
    });
    const foundUser = await prisma.user.findUnique({ where: { email: user.email } });
    expect(foundUser).not.toBeNull();
    expect(foundUser?.name).toBe(user.name);
  });

  it('should return null when finding by non-existent email', async () => {
    const foundUser = await prisma.user.findUnique({ where: { email: 'non-existent@example.com' } });
    expect(foundUser).toBeNull();
  });
});

