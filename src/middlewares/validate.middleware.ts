import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';

export function validateDto<T extends object>(dtoClass: new () => T) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const data = plainToInstance(dtoClass, req.body);
		const errors = await validate(data);

		if (errors.length > 0) {
			return res.status(400).json({
				message: 'Erro(s) de validação.',
				errors: errors.map((err) => ({
					property: err.property,
					constraints: err.constraints,
				})),
			});
		}

		req.body = data;
		next();
	};
}
