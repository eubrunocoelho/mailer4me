import { type Request, type Response, Router } from 'express';

const mailRouter: Router = Router();

mailRouter.get('/', (_req: Request, res: Response) => {
	res.json({
		message: 'What are you doing here?',
	});
});

mailRouter.post('/send', (req: Request, res: Response) => {
	res.status(201).json({
		message: 'Dados recebidos com sucesso!',
		data: req.body,
	});
});

export { mailRouter };
