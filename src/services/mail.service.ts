import { SendMailDto } from '../dtos/send-mail.dto.ts';
import { MailServiceResponse } from '../interfaces/mail-service-response.interface.ts';
import { MailerProvider } from '../providers/mailer.provider.ts';

export class MailService {
	static async sendMail(data: SendMailDto): Promise<MailServiceResponse> {
		const transporter = MailerProvider.getTransporter();

		try {
			await transporter.sendMail({
				from: process.env.SMTP_FROM,
				to: process.env.SMTP_FROM,
				subject: data.subject,
				text: data.message,
			});

			return { success: true };
		} catch (error) {
			console.error('Falha ao enviar o e-mail:', error);

			return {
				success: false,
				message: 'Falha ao enviar o e-mail',
			};
		}
	}
}
