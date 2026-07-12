import { SendConfirmationListener } from '../listeners/send-confirmation.listener.ts';
import { MailEventName } from './event-names.ts';
import { MailEvents } from './mail.emitter.ts';

/**
 * Conecta eventos aos seus respectivos listeners.
 */
export class EventRegistry {
	static registerListeners(): void {
		/**
		 * Registra todos os listeners da aplicação.
		 *
		 * @remarks
		 * Deve ser chamado uma única vez, na inicialização do app.
		 */
		MailEvents.on(MailEventName.MAIL_SENT, SendConfirmationListener.handle);
	}
}
