import { Router } from 'express';
import { ConnectionController } from '../controller/ConnectionController';

export function createConnectionRouter(connectionController: ConnectionController) {
    const router = Router();
    router.get('/test', (req, res) => connectionController.testConnection(req, res));
    return router;
}

