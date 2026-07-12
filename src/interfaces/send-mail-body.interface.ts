/**
 * Formato esperado do corpo da requisição `POST /mail/send`.
 *
 * @remarks
 * Implementada por {@link SendMailDto}.
 */
export interface SendMailBody {
	name: string;
	email: string;
	subject: string;
	message: string;
}
