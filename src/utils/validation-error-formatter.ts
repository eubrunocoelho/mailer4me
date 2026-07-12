import { ValidationError } from 'class-validator';

import { ValidationErrorResponse } from '../interfaces/validation-error-response.interface.ts';

/**
 * Converte os erros brutos do `class-validator` para um formato
 * simplificado, seguro para expor na resposta da API.
 */
export class ValidationErrorFormatter {
	/**
	 * @param errors - Erros retornados por `validate()` do class-validator
	 * @returns Lista simplificada, com apenas o campo e as mensagens de erro
	 */
	static format(errors: ValidationError[]): ValidationErrorResponse[] {
		return errors.map((error) => ({
			property: error.property,
			constraints: error.constraints,
		}));
	}
}
