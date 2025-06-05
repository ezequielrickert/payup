import { loadHandler, users } from '../handler/LoadHandler';
import { Request, Response } from 'express';

describe('withdrawHandler', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Resetear balances para evitar side effects entre tests
        users[0].balance = 1000000;
        users[1].balance = 200;
    });

    it('debería retirar dinero exitosamente usando email', () => {
        req.body = { email: 'rich@payup.com', amount: 500 };

        loadHandler(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith({ status: 'OK' });
        expect(users[0].balance).toBe(999500);
    });

    it('debería devolver 400 si falta amount', () => {
        req.body = { email: 'rich@payup.com' };

        loadHandler(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'You must provide email or cvu and amount' });
    });

    it('debería devolver 400 si falta email', () => {
        req.body = { amount: 500 };

        loadHandler(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'You must provide email or cvu and amount' });
    });

    it('debería devolver 404 si el usuario no existe', () => {
        req.body = { email: 'notexist@payup.com', amount: 500 };

        loadHandler(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User does not exist' });
    });

    it('debería devolver 400 si el balance es insuficiente', () => {
        req.body = { email: 'poor@payup.com', amount: 1000 };

        loadHandler(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Insufficient balance' });
    });
});