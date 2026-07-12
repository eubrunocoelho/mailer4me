import { EventEmitter } from 'node:events';

import type { MailSentEvent } from './mail-sent.event.ts';

/**
 * Wrapper tipado sobre o `EventEmitter` nativo do Node, usado para
 * desacoplar o envio do e-mail principal de ações secundárias
 * (como o e-mail de confirmação).
 */
export class MailEvents {
	private static emitter = new EventEmitter();

	/**
	 * Emite um evento com o payload informado.
	 *
	 * @param event - Nome do evento ({@link MailEventName})
	 * @param payload - Dados repassados a todos os listeners registrados
	 */
	static emit(event: string, payload: MailSentEvent): void {
		MailEvents.emitter.emit(event, payload);
	}

	/**
	 * Registra um listener para um evento.
	 *
	 * @param event - Nome do evento ({@link MailEventName})
	 * @param listener - Função executada quando o evento for emitido
	 */
	static on(event: string, listener: (payload: MailSentEvent) => void): void {
		MailEvents.emitter.on(event, listener);
	}
}
