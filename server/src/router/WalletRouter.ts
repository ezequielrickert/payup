import { Router } from 'express';
import { WalletController } from '../controller/WalletController';

export function createWalletRouter(walletController: WalletController): Router {
    const router = Router();

    router.get('/:userId', (req, res) => walletController.getWallet(req, res));
    router.post('/', (req, res) => walletController.createWallet(req, res));
    router.post('/:userId/deposit', (req, res) => walletController.deposit(req, res));
    router.post('/:userId/withdraw', (req, res) => walletController.withdraw(req, res));

    return router;
}

