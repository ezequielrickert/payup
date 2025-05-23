import { Router } from 'express';
import { withdrawHandler } from '../handler/WithdrawHandler';

const router = Router();

router.post('/withdraw', withdrawHandler);

export default router;
