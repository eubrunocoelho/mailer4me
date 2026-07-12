/**
 * Formato simplificado de um erro de validação.
 */
export interface ValidationErrorResponse {
	/** Nome do campo do DTO que falhou na validação. */
	property: string;
	/** Mapa `nome-da-regra -> mensagem`, gerado pelo class-validator.  */
	constraints:
		| {
				[type: string]: string;
		  }
		| undefined;
}
