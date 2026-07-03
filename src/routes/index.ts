import { Router } from 'express';

import { mailRouter } from './mail.routes.js';

const router = Router();

router.use('/mail', mailRouter);

export { router };
