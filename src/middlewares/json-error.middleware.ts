import { type NextFunction, type Request, type Response } from 'express';

/**
 * Middleware de tratamento de erro para JSON mal-formado no corpo da
 * requisição.
 *
 * @remarks
 * Precisa ser registrado **depois** de `express.json()` e das rotas.
 */
export class JsonErrorMiddleware {
	/**
	 * Intercepta erros de parsing de JSON e responde com `400`.
	 * Qualquer outro tipo de erro é repassado adiante via `next(err)`.
	 *
	 * @param err - Erro capturado pelo Express
	 * @param _req - Requisição HTTP (não utiliza)
	 * @param res - Resposta HTTP
	 * @param next - Repassa o erro adiante quando não for um erro JSON
	 */
	static handle(err: unknown, _req: Request, res: Response, next: NextFunction): void {
		const isJsonSyntaxError = err instanceof SyntaxError && 'body' in err;

		if (!isJsonSyntaxError) {
			next(err);

			return;
		}

		res.status(400).json({
			message: 'O corpo da requisição contém um JSON mal-formado.',
		});
	}
}
