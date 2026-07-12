import { Router } from 'express';

import { MailController } from '../controllers/mail.controller.ts';
import { SendMailDto } from '../dtos/send-mail.dto.ts';
import { MailRateLimiterMiddleware } from '../middlewares/mail-rate-limiter.middleware.ts';
import { ValidateDtoMiddleware } from '../middlewares/validate-dto.middleware.ts';

/** Router do domínio de e-mail, montado em `/mail`. */
const mailRouter: Router = Router();
const validateSendMailDto = new ValidateDtoMiddleware(SendMailDto);

/** `GET /mail` - health-check do domínio. */
mailRouter.get('/', MailController.index);

/**
 * `POST /mail/send` - envia uma mensagem de contato.
 *
 * @remarks
 * Pipeline: rate limit -> validação do DTO -> controller
 */
mailRouter.post('/send', MailRateLimiterMiddleware.handle, validateSendMailDto.handle, MailController.send);

export { mailRouter };
