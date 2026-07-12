import cors, { type CorsOptions } from 'cors';

/**
 * Middleware de CORS, configurável via variáveis de ambiente.
 *
 * @remarks
 * Ativado apenas quando `CORS_ENABLED=true`. Quanto ativo, sem
 * `CORS_ORIGIN` definido, libera automaticamente `http://localhost:<PORT>`
 * (conveniente em desemvolvimento)
 */
export class CorsMiddleware {
	/** Indica se o CORS deve ser registrado no app (`CORS_ENABLED=true`). */
	static readonly enabled = process.env.CORS_ENABLED === 'true';

	private static readonly defaultOrigin = `http://localhost:${process.env.PORT ?? 3000}`;

	private static readonly configuredOrigins = (process.env.CORS_ORIGIN ?? '')
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean);

	private static readonly allowedOrigins =
		CorsMiddleware.configuredOrigins.length > 0 ? CorsMiddleware.configuredOrigins : [CorsMiddleware.defaultOrigin];

	private static readonly options: CorsOptions = {
		origin: CorsMiddleware.allowedOrigins,
	};

	/** Middleware pronto para uso com `app.use()`. */
	static readonly handle = cors(CorsMiddleware.options);
}
