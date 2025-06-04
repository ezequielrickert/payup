import { Request, Response } from 'express';
import {LoadDto} from "../dto/LoadDto";
import { IWalletService } from '../application/port/IWalletService';

export class ApiController {
    constructor(private walletService: IWalletService) {}

    async callApi(req: Request, res: Response): Promise<void> {
        try {
            const { email, cvu, amount } = req.body as LoadDto;
            if (!email || !cvu || !amount) {
                res.status(400).json({ message: 'All fields are required' });
                return;
            }

            const parsedAmount = parseFloat(String(amount));
            if (isNaN(parsedAmount)) {
                res.status(400).json({ message: 'Amount must be a valid number' });
                return;
            }

            // Simulate an API call
            const loadDto: LoadDto = {
                email,
                cvu,
                amount: parsedAmount
            };

            const response = await fetch('http://api:3002/api/load', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loadDto)
            });

            if (!response.ok) {
                res.status(500).json({ message: 'Error calling API' });
                return;
            }

            const depositResponse = await this.walletService.deposit(cvu, parsedAmount);
            console.log(depositResponse);
            if (!depositResponse) {
                res.status(500).json({ message: 'Error depositing money' });
                return;
            }

            res.status(200).json({ message: 'Load successful', data: depositResponse });
        }
        catch (error) {
            console.error('Error calling API:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}