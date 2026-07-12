import { ValidationErrorResponse } from './validation-error-response.interface.ts';

/**
 * Formato da resposta HTTP quando a validação de um DTO falha.
 */
export interface ValidationFailure {
	message: string;
	errors: ValidationErrorResponse[];
}
