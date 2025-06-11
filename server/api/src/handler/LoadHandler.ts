import { Request, Response } from 'express';

export const users = [
    {
        email: 'rich@payup.com',
        cvu: '689097',
        balance: 1000000,
    },
    {
        email: 'poor@payup.com',
        cvu: '0000000001',
        balance: 200,
    },
];

interface LoadDto {
    email: string;
    cvu: number;
    amount: number;
}

export const loadHandler = (req: Request, res: Response) => {
    const { email, amount } = req.body as LoadDto;

    if (!amount || !email) {
        res.status(400).json({ error: 'Todos los campos son requeridos' });
        return;
    }

    const user = users.find(
        (u) => (email && u.email === email)
    );

    if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
    }

    if (user.balance! >= amount) {
        user.balance! -= amount;
        res.json({ status: 'OK' });
        return;

    } else {
        res.status(400).json({ error: 'Saldo insuficiente' });
        return;
    }
};
