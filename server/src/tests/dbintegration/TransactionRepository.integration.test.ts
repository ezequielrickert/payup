import prisma, { resetDatabase } from '../testUtils';

describe('TransactionRepository integration tests', () => {
  beforeAll(async () => {
    // Optionally, run migrations or db push here if needed
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  it('should save and find a transaction by id', async () => {
    const sender = await prisma.user.create({
      data: {
        name: 'Sender',
        email: 'sender2@example.com',
        password: 'securepassword',
        cvu: 20001,
      },
    });
    const receiver = await prisma.user.create({
      data: {
        name: 'Receiver',
        email: 'receiver2@example.com',
        password: 'securepassword',
        cvu: 20002,
      },
    });
    const transaction = await prisma.transaction.create({
      data: {
        amount: 500,
        senderCvu: sender.cvu,
        receiverCvu: receiver.cvu,
        description: 'Test transaction',
      },
    });
    const foundTransaction = await prisma.transaction.findUnique({ where: { id: transaction.id } });
    expect(foundTransaction).not.toBeNull();
    expect(foundTransaction?.amount).toBe(500);
    expect(foundTransaction?.senderCvu).toBe(sender.cvu);
    expect(foundTransaction?.receiverCvu).toBe(receiver.cvu);
  });

  it('should return null when finding by non-existent id', async () => {
    const foundTransaction = await prisma.transaction.findUnique({ where: { id: 99999 } });
    expect(foundTransaction).toBeNull();
  });

  it('should find all transactions for a user as sender', async () => {
    const sender = await prisma.user.create({
      data: {
        name: 'Sender',
        email: 'sender3@example.com',
        password: 'securepassword',
        cvu: 20003,
      },
    });
    const receiver = await prisma.user.create({
      data: {
        name: 'Receiver',
        email: 'receiver3@example.com',
        password: 'securepassword',
        cvu: 20004,
      },
    });
    await prisma.transaction.createMany({
      data: [
        { amount: 100, senderCvu: sender.cvu, receiverCvu: receiver.cvu, description: 'T1' },
        { amount: 200, senderCvu: sender.cvu, receiverCvu: receiver.cvu, description: 'T2' },
      ],
    });
    const sentTransactions = await prisma.transaction.findMany({ where: { senderCvu: sender.cvu } });
    expect(sentTransactions.length).toBe(2);
    expect(sentTransactions[0].senderCvu).toBe(sender.cvu);
  });

  it('should find all transactions for a user as receiver', async () => {
    const sender = await prisma.user.create({
      data: {
        name: 'Sender',
        email: 'sender4@example.com',
        password: 'securepassword',
        cvu: 20005,
      },
    });
    const receiver = await prisma.user.create({
      data: {
        name: 'Receiver',
        email: 'receiver4@example.com',
        password: 'securepassword',
        cvu: 20006,
      },
    });
    await prisma.transaction.createMany({
      data: [
        { amount: 300, senderCvu: sender.cvu, receiverCvu: receiver.cvu, description: 'T3' },
        { amount: 400, senderCvu: sender.cvu, receiverCvu: receiver.cvu, description: 'T4' },
      ],
    });
    const receivedTransactions = await prisma.transaction.findMany({ where: { receiverCvu: receiver.cvu } });
    expect(receivedTransactions.length).toBe(2);
    expect(receivedTransactions[0].receiverCvu).toBe(receiver.cvu);
  });
});

