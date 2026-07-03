import { Router } from 'express';

const mailRouter = Router();

mailRouter.get('/', (_req, res) => {
	res.json({
		message: 'What are you doing here?',
	});
});

export { mailRouter };
