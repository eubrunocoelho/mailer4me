import { type Request, type Response, Router } from 'express';

const mailRouter: Router = Router();

mailRouter.get('/', (_req: Request, res: Response) => {
	res.json({
		message: 'What are you doing here?',
	});
});

export { mailRouter };
