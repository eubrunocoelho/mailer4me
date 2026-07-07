import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';

export class MailRateLimiterMiddleware {
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
