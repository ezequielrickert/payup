import { Router } from 'express';
import { ApiController } from '../controller/ApiController';

export function createApiRouter(apiController: ApiController): Router {
    const router = Router();

    router.post('/', (req, res) => apiController.callApi(req, res));

    return router;
}

