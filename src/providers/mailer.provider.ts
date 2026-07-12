import nodemailer, { type Transporter } from 'nodemailer';

/**
 * Fornece uma única instância (singleton) do transporter do Nodemailer,
 * configurada a partir de variáveis de ambiente `SMTP_*`.
 */
export class MailerProvider {
	private static instance: Transporter | undefined;

	/**
	 * Retorna o transporter SMTP, criando-o na primeira chamada e
	 * reaproveitando a mesma conexão configurada nas chamadas seguintes.
	 */
	static getTransporter(): Transporter {
		if (!MailerProvider.instance) {
			MailerProvider.instance = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT ?? 587),
				secure: process.env.SMTP_SECURE === 'true',
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			});
		}

		return MailerProvider.instance;
	}
}
