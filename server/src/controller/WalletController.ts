import { Request, Response } from 'express';
import { IWalletService } from "../application/port/IWalletService";

export class WalletController {
    constructor(private walletService: IWalletService) {}

    async getWallet(req: Request, res: Response): Promise<void> {
        try {
            const userCvu = Number(req.params.userCvu);
            console.log('userCvu recibido:', userCvu, typeof userCvu);
            if (isNaN(userCvu)) {
                res.status(400).json({ message: 'Invalid CVU' });
                return;
            }
            const wallet = await this.walletService.findByUserCvu(userCvu);
            if (!wallet) {
                res.status(404).json({ message: 'Wallet not found' });
                return;
            }
            res.json(wallet);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deposit(req: Request, res: Response): Promise<void> {
        try {
            const userCvu = Number(req.params.userId);
            const { amount } = req.body;
            const wallet = await this.walletService.deposit(userCvu, amount);
            res.json(wallet);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async withdraw(req: Request, res: Response): Promise<void> {
        try {
            const userCvu = Number(req.params.userId);
            const { amount } = req.body;
            const wallet = await this.walletService.withdraw(userCvu, amount);
            res.json(wallet);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

