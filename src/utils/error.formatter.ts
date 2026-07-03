import { ValidationError } from 'class-validator';

import { ValidationErrorResponse } from '../types/validation-error.ts';

export function formatValidationErrors(errors: ValidationError[]): ValidationErrorResponse[] {
	return errors.map((err) => ({
		property: err.property,
		constraints: err.constraints,
	}));
}
