import { Router } from 'express';

import { mailRouter } from './mail.routes.ts';

const router: Router = Router();

router.use('/mail', mailRouter);

export { router };
