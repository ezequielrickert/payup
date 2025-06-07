import prisma, { resetDatabase } from '../testUtils';

describe('WalletRepository integration tests', () => {
  beforeAll(async () => {
    // Optionally, run migrations or db push here if needed
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  it('should save and find a wallet by userCvu', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Wallet User',
        email: 'walletuser@example.com',
        password: 'securepassword',
        cvu: 10001,
      },
    });
    await prisma.wallet.create({
      data: {
        userCvu: user.cvu,
        balance: 100,
      },
    });
    const foundWallet = await prisma.wallet.findUnique({ where: { userCvu: user.cvu } });
    expect(foundWallet).not.toBeNull();
    expect(foundWallet?.userCvu).toBe(user.cvu);
    expect(foundWallet?.balance).toBe(100);
  });

  it('should return null when finding by non-existent userCvu', async () => {
    const foundWallet = await prisma.wallet.findUnique({ where: { userCvu: 99999 } });
    expect(foundWallet).toBeNull();
  });

  it('should update an existing wallet', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Wallet User',
        email: 'walletuser2@example.com',
        password: 'securepassword',
        cvu: 10002,
      },
    });
    await prisma.wallet.create({
      data: {
        userCvu: user.cvu,
        balance: 100,
      },
    });
    await prisma.wallet.update({
      where: { userCvu: user.cvu },
      data: { balance: 200 },
    });
    const foundWallet = await prisma.wallet.findUnique({ where: { userCvu: user.cvu } });
    expect(foundWallet).not.toBeNull();
    expect(foundWallet?.balance).toBe(200);
  });

  it('should not update a non-existent wallet', async () => {
    await expect(
      prisma.wallet.update({
        where: { userCvu: 99999 },
        data: { balance: 300 },
      })
    ).rejects.toThrow();
  });
});

