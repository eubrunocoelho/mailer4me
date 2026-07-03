import { SendMailDto } from '../../routes/mail.dto.ts';
import { MailServiceResponse } from './mail.service.response.ts';

export class MailService {
	static async sendMail(data: SendMailDto): Promise<MailServiceResponse> {
		console.log(`Recebendo e-mail de ${data.name}...`);

		return { success: true };
	}
}
