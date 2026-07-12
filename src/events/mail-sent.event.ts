/**
 * Payload emitido no evento {@link MailEventName.MAIL_SENT}.
 */
export interface MailSentEvent {
	name: string;
	email: string;
	subject: string;
}
