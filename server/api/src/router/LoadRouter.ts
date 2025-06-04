import { Router } from 'express';
import { loadHandler } from '../handler/LoadHandler';

const router = Router();

router.post('/load', loadHandler);

export default router;
