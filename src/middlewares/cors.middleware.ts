import cors, { type CorsOptions } from 'cors';

export class CorsMiddleware {
	private static readonly allowedOrigins = (process.env.CORS_ORIGIN ?? '')
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean);

	private static readonly options: CorsOptions = {
		origin: CorsMiddleware.allowedOrigins.length > 0 ? CorsMiddleware.allowedOrigins : false,
	};

	static readonly handle = cors(CorsMiddleware.options);
}
