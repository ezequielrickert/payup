import { Request, Response } from 'express';

export const users = [
    {
        email: 'rich@payup.com',
        cbu: '1234567890',
        balance: 1000000,
    },
    {
        email: 'poor@payup.com',
        cbu: '0000000001',
        balance: 5,
    },
];

interface WithdrawRequest {
    email?: string;
    cbu?: string;
    amount: number;
}

// 👇 NOTA: tipamos los argumentos manualmente
export const withdrawHandler = (req: Request, res: Response) => {
    const { email, cbu, amount } = req.body as WithdrawRequest;

    if (!amount || (!email && !cbu)) {
        res.status(400).json({ error: 'You must provide email or cbu and amount'});
        return;
    }

    const user = users.find(
        (u) => (email && u.email === email) || (cbu && u.cbu === cbu)
    );

    if (!user) {
        res.status(404).json({ error: 'User does not exist' });
        return;
    }

    if (user.balance < amount) {
        res.status(400).json({ error: 'Insufficient balance' });
        return;
    }

    user.balance -= amount;
    res.json({ status: 'OK' });
};
