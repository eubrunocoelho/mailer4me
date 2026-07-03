import { type Request, type Response, Router } from 'express';

import { validateDto } from '../middlewares/validate.middleware.ts';
import { MailService } from '../services/mail/mail.service.ts';
import { SendMailDto } from './mail.dto.ts';

const mailRouter: Router = Router();

mailRouter.get('/', (_req: Request, res: Response) => {
	res.json({
		message: 'What are you doing here?',
	});
});

mailRouter.post('/send', validateDto(SendMailDto), async (req: Request, res: Response) => {
	const mailData = req.body as SendMailDto;

	await MailService.sendMail(mailData);

	res.status(201).json({
		message: 'Dados recebidos com sucesso!',
		data: mailData,
	});
});

export { mailRouter };
