import { Router } from 'express';

import { mailRouter } from './mail.routes.ts';

/**
 * Router raiz da aplicação, agregando os routers de cada domínio.
 */
const router: Router = Router();

router.use('/mail', mailRouter);

export { router };
