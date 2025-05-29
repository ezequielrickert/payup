import { Request, Response } from 'express';
import { IWalletService } from "../application/port/IWalletService";

export class WalletController {
    constructor(private walletService: IWalletService) {}

    async getWallet(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            const wallet = await this.walletService.findByUserId(userId);
            if (!wallet) {
                res.status(404).json({ message: 'Wallet not found' });
                return;
            }
            res.json(wallet);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createWallet(req: Request, res: Response): Promise<void> {
        try {
            const { userId, initialBalance } = req.body;
            await this.walletService.createWallet(userId, initialBalance ?? 0);
            res.status(201).json({ message: 'Wallet created' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deposit(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            const { amount } = req.body;
            const wallet = await this.walletService.deposit(userId, amount);
            res.json(wallet);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async withdraw(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            const { amount } = req.body;
            const wallet = await this.walletService.withdraw(userId, amount);
            res.json(wallet);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

