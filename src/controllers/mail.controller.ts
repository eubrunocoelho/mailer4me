import { type Request, type Response } from 'express';

import { SendMailDto } from '../dtos/send-mail.dto.ts';
import { MailService } from '../services/mail.service.ts';

export class MailController {
	static index(_req: Request, res: Response): void {
		res.json({
			message: 'What are you doing here?',
		});
	}

	static async send(req: Request, res: Response): Promise<void> {
		const mailData = req.body as SendMailDto;

		await MailService.sendMail(mailData);

		res.status(201).json({
			message: 'Dados recebidos com sucesso!',
			data: mailData,
		});
	}
}
