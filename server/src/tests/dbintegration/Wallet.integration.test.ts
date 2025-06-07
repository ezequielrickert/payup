import prisma, { resetDatabase } from '../testUtils';

describe('Wallet integration tests', () => {
  beforeAll(async () => {
    // Optionally, run migrations or db push here if needed
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  it('should create a wallet with valid data', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'walletuser@example.com',
        name: 'Wallet User',
        cvu: 1234567890,
        password: 'securepassword',
      },
    });
    const wallet = await prisma.wallet.create({
      data: {
        userCvu: user.cvu,
        balance: 100,
      },
    });
    expect(wallet.userCvu).toBe(user.cvu);
    expect(wallet.balance).toBe(100);
  });
});

