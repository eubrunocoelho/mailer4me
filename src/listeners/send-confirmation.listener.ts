import type { MailSentEvent } from '../events/mail-sent.event.ts';
import { MailerProvider } from '../providers/mailer.provider.ts';
import { TemplateRendererProvider } from '../providers/template-renderer.provider.ts';

export class SendConfirmationListener {
	static async handle(payload: MailSentEvent): Promise<void> {
		const transporter = MailerProvider.getTransporter();

		const html = TemplateRendererProvider.render('mail-confirmation', {
			name: payload.name,
			subject: payload.subject,
		});

		try {
			await transporter.sendMail({
				from: process.env.SMTP_FROM,
				to: payload.email,
				subject: 'Recebemos sua mensagem!',
				html,
			});
		} catch (error) {
			console.error('Falha ao enviar e-mail de confirmação:', error);
		}
	}
}
