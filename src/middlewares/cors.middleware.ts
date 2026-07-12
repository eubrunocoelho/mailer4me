import cors, { type CorsOptions } from 'cors';

export class CorsMiddleware {
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

	static readonly handle = cors(CorsMiddleware.options);
}
