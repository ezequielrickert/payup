import { Request, Response } from 'express';
import {LoadDto} from "../dto/LoadDto";
import { IWalletService } from '../application/port/IWalletService';

export class ApiController {
    constructor(private walletService: IWalletService) {}

    async callApi(req: Request, res: Response): Promise<void> {
        try {
            const { email, cvu, amount } = req.body as LoadDto;
            if (!email || !cvu || !amount) {
                res.status(400).json({ message: 'Todos los campos son requeridos' });
                return;
            }

            const parsedAmount = parseFloat(String(amount));
            if (isNaN(parsedAmount)) {
                res.status(400).json({ message: 'El monto debe ser un número válido' });
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
                let errorMsg = 'Ocurrió un error inesperado.';
                try {
                    const text = await response.text();
                    if (text) {
                        try {
                            const errorData = JSON.parse(text);
                            errorMsg = errorData.message || errorData.error || text;
                        } catch {
                            // No es JSON, usa el texto tal cual
                            errorMsg = text;
                        }
                    }
                } catch {
                    // No se pudo leer el body, deja el mensaje genérico
                }
                res.status(response.status).json({ message: errorMsg });
                console.log(errorMsg);
                return;
            }

            const depositResponse = await this.walletService.deposit(cvu, parsedAmount);

            if (!depositResponse) {
                res.status(409).json({ message: 'Saldo insuficiente' });
                return;
            }

            res.status(200).json({ message: 'OK', data: depositResponse });
        }
        catch (error) {
            console.error('Error calling API:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}