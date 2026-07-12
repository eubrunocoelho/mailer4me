import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';

import { ValidationErrorFormatter } from '../utils/validation-error-formatter.ts';

/**
 * Middleware genérico de validação de DTOs, usando os decorators do `class-validator`.
 *
 * @typeParam T - Classe do DTO a ser validado (ex: {@link SendMailDto})
 *
 * @example
 * ```ts
 * const validateSendMailDto = new ValidateDtoMiddleware(SendMailDto);
 * router.post('/send', validateSendMailDto.handle, constroller.send);
 * ```
 */
export class ValidateDtoMiddleware<T extends object> {
	/**
	 * @param dtoClass - Construtor da classe DTO usada para validar `req.body`
	 */
	constructor(private readonly dtoClass: new () => T) {}

	/**
	 * Converte `req.body` em uma instância do DTO e valida seus campos.
	 * Em caso de erro, responde com `400` e não chama `next()`.
	 * Em caso de sucesso, substitui `req.body` pela instância validada.
	 */
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
