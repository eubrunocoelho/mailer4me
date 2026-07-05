import { ValidationErrorResponse } from './validation-error-response.interface.ts';

export interface ValidationFailure {
	message: string;
	errors: ValidationErrorResponse[];
}
