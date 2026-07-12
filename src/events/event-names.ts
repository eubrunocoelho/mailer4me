/**
 * Nomes de eventos emitidos via {@link MailEvents}.
 *
 * @remarks
 * Centralizar os nomes aqui evita strings soltas espalhadas pelo código
 * (ex: `"mail.sent"` digitado errado em algum lugar sem ninguém notar).
 */
export const MailEventName = {
	MAIL_SENT: 'mail.sent',
} as const;
