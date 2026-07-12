/**
 * Retorno padrão de operações do {@link MailService}.
 */
export interface MailServiceResponse {
	/** `true` se o e-mail foi enviado com sucesso. */
	success: boolean;
	/** Mensagem de erro, presente apenas quando `success` for `false`.  */
	message?: string;
}
