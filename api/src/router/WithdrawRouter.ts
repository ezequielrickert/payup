import { Router } from 'express';
import { withdrawHandler } from '../handler/WithdrawHandler';

const router = Router();

router.post('/load', withdrawHandler);

export default router;
