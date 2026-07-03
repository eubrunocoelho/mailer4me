import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type Request, type Response, Router } from 'express';

import { SendMailDto } from './mail.dto.ts';

const mailRouter: Router = Router();

mailRouter.get('/', (_req: Request, res: Response) => {
	res.json({
		message: 'What are you doing here?',
	});
});

mailRouter.post('/send', async (req: Request, res: Response) => {
	const mailData = plainToInstance(SendMailDto, req.body);
	const errors = await validate(mailData);

	if (errors.length > 0) {
		return res.status(400).json({
			message: 'Ocorreu erros de validação',
			errors: errors.map((err) => ({
				property: err.property,
				constraints: err.constraints,
			})),
		});
	}

	res.status(201).json({
		message: 'Dados recebidos com sucesso!',
		data: mailData,
	});
});

export { mailRouter };
