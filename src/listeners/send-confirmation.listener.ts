import type { MailSentEvent } from '../events/mail-sent.event.ts';
import { MailerProvider } from '../providers/mailer.provider.ts';
import { TemplateRendererProvider } from '../providers/template-renderer.provider.ts';

/**
 * Reage ao evento {@link MailEventName.MAIL_SENT} enviando uma confirmação
 * de recebimento para quem preencheu o formulário.
 *
 * @remarks
 * Registrado em {@link EventRegistry}. Falhas aqui não afetam a resposta
 * HTTP da rota `/mail/send` - o erro só é registrado no console.
 */
export class SendConfirmationListener {
	/**
	 * Envia o e-mail de confirmação.
	 *
	 * @param payload - Dados de quem enviou a mensagem original
	 */
	static async handle(payload: MailSentEvent): Promise<void> {
		const transporter = MailerProvider.getTransporter();

		const html = TemplateRendererProvider.render('mail-confirmation', { payload });

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
