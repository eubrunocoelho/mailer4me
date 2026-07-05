import { SendMailDto } from '../dtos/send-mail.dto.ts';
import { MailServiceResponse } from '../interfaces/mail-service-response.interface.ts';

export class MailService {
	static async sendMail(data: SendMailDto): Promise<MailServiceResponse> {
		console.log(`Recebendo e-mail de ${data.name}...`);

		return { success: true };
	}
}
