import { ValidationError } from 'class-validator';

import { ValidationErrorResponse } from '../interfaces/validation-error-response.interface.ts';

export class ValidationErrorFormatter {
	static format(errors: ValidationError[]): ValidationErrorResponse[] {
		return errors.map((error) => ({
			property: error.property,
			constraints: error.constraints,
		}));
	}
}
