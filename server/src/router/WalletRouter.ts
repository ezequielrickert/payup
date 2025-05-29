import { Router } from 'express';
import { WalletController } from '../controller/WalletController';

export function createWalletRouter(walletController: WalletController): Router {
    const router = Router();

    router.get('/:userCvu', (req, res) => walletController.getWallet(req, res));
    router.post('/:userCvu/deposit', (req, res) => walletController.deposit(req, res));
    router.post('/:userCvu/withdraw', (req, res) => walletController.withdraw(req, res));

    return router;
}

