import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { SendMailBody } from './mail.interface.ts';

class SendMailDto implements SendMailBody {
	@IsString()
	@IsNotEmpty({ message: `O campo 'nome' é obrigatório.` })
	@MinLength(4, { message: `O campo 'nome' deve ter pelo menos 4 caracteres.` })
	@MaxLength(40, { message: `O campo 'nome' deve ter no máximo 40 caracteres.` })
	name!: string;

	@IsEmail({}, { message: `O endereço de e-mail está inválido.` })
	email!: string;

	@IsString()
	@IsNotEmpty({ message: `O campo 'assunto' é obrigatório.` })
	@MinLength(6, { message: `O campo 'assunto' deve ter pelo menos 6 caracteres.` })
	@MaxLength(40, { message: `O campo 'assunto' deve ter no máximo 40 caracteres.` })
	subject!: string;

	@IsString()
	@IsNotEmpty({ message: `O campo 'mensagem' é obrigatório.` })
	@MinLength(6, { message: `O campo 'mensagem' deve ter pelo menos 6 caracteres.` })
	@MaxLength(10000, { message: `A mensagem está muito longa.` })
	message!: string;
}

export { SendMailDto };
