import { SendMailDto } from '../dtos/send-mail.dto.ts';
import { MailEventName } from '../events/event-names.ts';
import { MailEvents } from '../events/mail.emitter.ts';
import { MailServiceResponse } from '../interfaces/mail-service-response.interface.ts';
import { MailerProvider } from '../providers/mailer.provider.ts';
import { TemplateRendererProvider } from '../providers/template-renderer.provider.ts';

export class MailService {
	static async sendMail(data: SendMailDto): Promise<MailServiceResponse> {
		const transporter = MailerProvider.getTransporter();

		const html = TemplateRendererProvider.render('mail-received', { data });

		try {
			await transporter.sendMail({
				from: process.env.SMTP_FROM,
				to: process.env.SMTP_FROM,
				subject: `"${data.subject}" - ${data.email}`,
				html,
			});

			MailEvents.emit(MailEventName.MAIL_SENT, {
				name: data.name,
				email: data.email,
				subject: data.subject,
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
