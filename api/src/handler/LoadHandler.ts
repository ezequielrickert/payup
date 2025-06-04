import { Request, Response } from 'express';

export const users = [
    {
        email: 'rich@payup.com',
        cvu: '1234567890',
        balance: 1000000,
    },
    {
        email: 'poor@payup.com',
        cvu: '0000000001',
        balance: 200,
    },
];

interface LoadRequest {
    cvu: string;
    amount: number;
}

// 👇 NOTA: tipamos los argumentos manualmente
export const loadHandler = (req: Request, res: Response) => {
    const { cvu, amount } = req.body as LoadRequest;

    if (!amount || !cvu) {
        res.status(400).json({ error: 'You must provide email or cvu and amount'});
        return;
    }

    const user = users.find(
        (u) => (cvu && u.cvu === cvu)
    );

    if (!user) {
        res.status(404).json({ error: 'User does not exist' });
        return;
    }

    if (user.balance >= amount) {
        user.balance -= amount;
        res.json({ status: 'OK' });
        return;

    } else {
        res.status(400).json({ error: 'Insufficient balance' });
        return;
    }
};
