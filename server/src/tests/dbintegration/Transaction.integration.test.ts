import prisma, { resetDatabase } from '../testUtils';

describe('Transaction integration tests', () => {
  beforeAll(async () => {
    // Optionally, run migrations or db push here if needed
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await resetDatabase();
  });


  // todo: tira ror
  it('should create a valid transaction', async () => {
    // Create sender and receiver users
    const sender = await prisma.user.create({
      data: {
        name: 'Sender',
        email: 'sender@example.com',
        password: 'securepassword',
        cvu: 1234567890,
      },
    });
    const receiver = await prisma.user.create({
      data: {
        name: 'Receiver',
        email: 'receiver@example.com',
        password: 'securepassword',
        cvu: 1234567980,
      },
    });
    // Create wallets for sender and receiver
    await prisma.wallet.create({
      data: {
        userCvu: sender.cvu,
        balance: 1000,
      },
    });
    await prisma.wallet.create({
      data: {
        userCvu: receiver.cvu,
        balance: 1000,
      },
    });
    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount: 1000,
        senderCvu: sender.cvu,
        receiverCvu: receiver.cvu,
        description: 'P2P transaction',
      },
    });
    expect(transaction.amount).toBe(1000);
    expect(transaction.senderCvu).toBe(sender.cvu);
    expect(transaction.receiverCvu).toBe(receiver.cvu);
    expect(transaction.description).toBe('P2P transaction');
  });

  it('should throw an error when CVUs are invalid', async () => {
    await expect(
      prisma.transaction.create({
        data: {
          amount: 1000,
          senderCvu: -1234567890,
          receiverCvu: -9876543210,
          description: 'Invalid CVU',
        },
      })
    ).rejects.toThrow();
  });
});
