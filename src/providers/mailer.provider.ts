import nodemailer, { type Transporter } from 'nodemailer';

export class MailerProvider {
	private static instance: Transporter | undefined;

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

			MailerProvider.instance.verify((error, success) => {
				if (error) console.error('Erro na configuração do SMTP:', error);
				else console.log('Servidor de e-mail pronto para uso.');
			});
		}

		return MailerProvider.instance;
	}
}
