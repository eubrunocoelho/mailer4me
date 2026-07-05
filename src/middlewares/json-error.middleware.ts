import { type NextFunction, type Request, type Response } from 'express';

export class JsonErrorMiddleware {
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
