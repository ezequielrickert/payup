import { Router } from 'express';
import { ApiController } from '../controller/ApiController';

export function createWalletRouter(apiController: ApiController): Router {
    const router = Router();

    router.get('/:userCvu', (req, res) => apiController.callApi(req, res));

    return router;
}

