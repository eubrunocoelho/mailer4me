import { type Request, type Response } from 'express';

import { SendMailDto } from '../dtos/send-mail.dto.ts';
import { MailService } from '../services/mail.service.ts';

/**
 * Controller responsável pelas rotas do domínio de e-mail.
 */
export class MailController {
	static index(_req: Request, res: Response): void {
		res.json({
			message: 'What are you doing here?',
		});
	}

	static async send(req: Request, res: Response): Promise<void> {
		const mailData = req.body as SendMailDto;
		const result = await MailService.sendMail(mailData);

		if (!result.success) {
			res.status(502).json({
				message: result.message ?? 'Falha ao enviar e-mail.',
			});

			return;
		}

		res.status(201).json({
			message: 'E-mail enviado com sucesso!',
			data: mailData,
		});
	}
}
