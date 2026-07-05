import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';

import { ValidationErrorFormatter } from '../utils/validation-error-formatter.ts';

export class ValidateDtoMiddleware<T extends object> {
	constructor(private readonly dtoClass: new () => T) {}

	handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const data = plainToInstance(this.dtoClass, req.body);
		const errors = await validate(data);

		if (errors.length > 0) {
			res.status(400).json({
				message: 'Erro(s) de validação.',
				errors: ValidationErrorFormatter.format(errors),
			});

			return;
		}

		req.body = data;
		next();
	};
}
