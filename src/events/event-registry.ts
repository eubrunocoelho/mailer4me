import { SendConfirmationListener } from '../listeners/send-confirmation.listener.ts';
import { MailEventName } from './event-names.ts';
import { MailEvents } from './mail.emitter.ts';

export class EventRegistry {
	static registerListeners(): void {
		MailEvents.on(MailEventName.MAIL_SENT, SendConfirmationListener.handle);
	}
}
