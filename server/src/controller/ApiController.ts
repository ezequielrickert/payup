import { Request, Response } from 'express';
import {LoadDto} from "../dto/LoadDto";

export class ApiController {

    async callApi(req: Request, res: Response): Promise<void> {
        try {
            const userCvu = Number(req.params.userCvu);
            const amount = req.body.amount;
            if (!userCvu) {
                res.status(400).json({ message: 'User CVU must be provided' });
                return;
            }
            // Simulate an API call
            const loadDto: LoadDto = {
                cvu: userCvu,
                amount: amount
            }

            const response = await fetch('http://localhost:3002/load', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loadDto)
            });

            if (!response.ok) {
                const errorData = await response.json();
                res.status(response.status).json({ message: errorData.message });
                return;
            }

            const data = await response.json();
            res.status(200).json({ message: 'Load successful', data });
        }
        catch (error) {
            console.error('Error calling API:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}