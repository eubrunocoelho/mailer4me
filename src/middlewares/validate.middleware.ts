import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';

import { formatValidationErrors } from '../utils/error.formatter.ts';

export function validateDto<T extends object>(dtoClass: new () => T) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const data = plainToInstance(dtoClass, req.body);
		const errors = await validate(data);
		const hasErrors = errors.length > 0;

		if (hasErrors) {
			return res.status(400).json({
				message: 'Erro(s) de validação.',
				errors: formatValidationErrors(errors),
			});
		}

		req.body = data;
		next();
	};
}
