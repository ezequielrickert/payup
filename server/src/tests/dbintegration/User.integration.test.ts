import prisma, { resetDatabase } from '../testUtils';

describe('User integration tests', () => {
  beforeAll(async () => {
    // Optionally, run migrations or db push here if needed
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  it('should create and retrieve a user', async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        cvu: 1234567890,
        password: 'securepassword',
      },
    });

    const foundUser = await prisma.user.findUnique({
      where: { id: createdUser.id },
    });

    expect(foundUser).not.toBeNull();
    expect(foundUser?.email).toBe('test@example.com');
  });
});

