import { Router } from 'express';

import { MailController } from '../controllers/mail.controller.ts';
import { SendMailDto } from '../dtos/send-mail.dto.ts';
import { ValidateDtoMiddleware } from '../middlewares/validate-dto.middleware.ts';

const mailRouter: Router = Router();
const validateSendMailDto = new ValidateDtoMiddleware(SendMailDto);

mailRouter.get('/', MailController.index);
mailRouter.post('/send', validateSendMailDto.handle, MailController.send);

export { mailRouter };
