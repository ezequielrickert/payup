import { withdrawHandler } from '../handler/WithdrawHandler';
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
    });

    it('should withdraw money successfully when using email', () => {
        req.body = { email: 'rich@payup.com', amount: 500 };

        withdrawHandler(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith({ status: 'OK' });
    });

    it('should withdraw money successfully when using cbu', () => {
        req.body = { cbu: '1234567890', amount: 500 };

        withdrawHandler(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith({ status: 'OK' });
    });

    it('should return 400 when amount is missing', () => {
        req.body = { email: 'rich@payup.com' };

        withdrawHandler(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'You must provide email or cbu and amount' });
    });

    it('should return 400 when both email and cbu are missing', () => {
        req.body = { amount: 500 };

        withdrawHandler(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'You must provide email or cbu and amount' });
    });

    it('should return 404 when user does not exist', () => {
        req.body = { email: 'notexist@payup.com', amount: 500 };

        withdrawHandler(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User does not exist' });
    });

    it('should return 400 when insufficient balance', () => {
        req.body = { email: 'poor@payup.com', amount: 1000 };

        withdrawHandler(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Insufficient balance' });
    });
});
