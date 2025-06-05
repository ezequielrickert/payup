import { InMemoryTransactionRepository } from '../adapters/InMemoryTransactionRepository';

describe('Transaction Repository', () => {
    let repo: InMemoryTransactionRepository;

    beforeEach(() => {
        repo = new InMemoryTransactionRepository();
    });

    it('should create a transaction and retrieve it for sender', async () => {
        const transaction = await repo.createTransaction(100, 12345, 67890, 'Test payment');
        const transactions = await repo.getUserTransactions(12345);
        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toEqual(transaction);
    });

    it('should create a transaction and retrieve it for receiver', async () => {
        const transaction = await repo.createTransaction(200, 11111, 22222, 'Receiver test');
        const transactions = await repo.getUserTransactions(22222);
        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toEqual(transaction);
    });

    it('should return an empty array if user has no transactions', async () => {
        const transactions = await repo.getUserTransactions(99999);
        expect(transactions).toEqual([]);
    });

    it('should store multiple transactions and filter by user', async () => {
        await repo.createTransaction(50, 1, 2, 'A');
        await repo.createTransaction(75, 2, 3, 'B');
        await repo.createTransaction(100, 3, 1, 'C');
        const user1Txs = await repo.getUserTransactions(1);
        expect(user1Txs).toHaveLength(2);
        expect(user1Txs.map(t => t.description).sort()).toEqual(['A', 'C']);
        const user2Txs = await repo.getUserTransactions(2);
        expect(user2Txs).toHaveLength(2);
        expect(user2Txs.map(t => t.description).sort()).toEqual(['A', 'B']);
        const user3Txs = await repo.getUserTransactions(3);
        expect(user3Txs).toHaveLength(2);
        expect(user3Txs.map(t => t.description).sort()).toEqual(['B', 'C']);
    });
});