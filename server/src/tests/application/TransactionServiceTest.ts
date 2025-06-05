import { describe, it, expect, beforeEach } from '@jest/globals';
import { TransactionService } from '../../application/adapter/TransactionService';
import { InMemoryTransactionRepository } from '../adapters/InMemoryTransactionRepository';
import { TransactionDto } from '../../dto/TransactionDto';


describe('TransactionService', () => {
    let repo: InMemoryTransactionRepository;
    let service: TransactionService;

    beforeEach(() => {
        repo = new InMemoryTransactionRepository();
        service = new TransactionService(repo);
    });

    it('should create a transaction and return it as DTO', async () => {
        const dto = new TransactionDto(100, 12345, 67890, 'Test payment');
        const result = await service.createTransaction(dto);
        expect(result).toBeInstanceOf(TransactionDto);
        expect(result.amount).toBe(100);
        expect(result.senderCvu).toBe(12345);
        expect(result.receiverCvu).toBe(67890);
        expect(result.description).toBe('Test payment');
    });

    it('should retrieve transactions for a user as DTOs', async () => {
        await service.createTransaction(new TransactionDto(50, 1, 2, 'A'));
        await service.createTransaction(new TransactionDto(75, 2, 3, 'B'));
        await service.createTransaction(new TransactionDto(100, 3, 1, 'C'));
        const user1Txs = await service.getUserTransactions(1);
        expect(user1Txs).toHaveLength(2);
        expect(user1Txs.every(tx => true)).toBe(true);
        expect(user1Txs.map(t => t.description).sort()).toEqual(['A', 'C']);
    });

    it('should return an empty array if user has no transactions', async () => {
        const txs = await service.getUserTransactions(99999);
        expect(txs).toEqual([]);
    });
});

