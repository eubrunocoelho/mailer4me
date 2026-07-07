import { EventEmitter } from 'node:events';

import type { MailSentEvent } from './mail-sent.event.ts';

export class MailEvents {
	private static emitter = new EventEmitter();

	static emit(event: string, payload: MailSentEvent): void {
		MailEvents.emitter.emit(event, payload);
	}

	static on(event: string, listener: (payload: MailSentEvent) => void): void {
		MailEvents.emitter.on(event, listener);
	}
}
