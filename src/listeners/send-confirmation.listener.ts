import type { MailSentEvent } from '../events/mail-sent.event.ts';
import { MailerProvider } from '../providers/mailer.provider.ts';

export class SendConfirmationListener {
	static async handle(payload: MailSentEvent): Promise<void> {
		const transporter = MailerProvider.getTransporter();

		try {
			await transporter.sendMail({
				from: process.env.SMTP_FROM,
				to: payload.email,
				subject: 'Recebemos sua mensagem!',
				text: `Olá ${payload.name}, recebemos sua mensagem com o assunto "${payload.subject}". Em breve entraremos em contato.`,
			});
		} catch (error) {
			console.error('Falha ao enviar e-mail de confirmação:', error);
		}
	}
}
