import { rateLimit, type RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Limita o número de requisições por IP na rota de envio de e-mail.
 */
export class MailRateLimiterMiddleware {
	/** No máximo 5 requisições por IP a cada 15 minutos. */
	static readonly handle: RateLimitRequestHandler = rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutos
		limit: 5,
		standardHeaders: true,
		legacyHeaders: false,
		message: {
			message: 'Muitas requisições enviadas. Tente novamente em alguns minutos.',
		},
	});
}
