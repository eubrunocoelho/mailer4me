# mailer4me

API de e-mail leve, construída em Node.js + TypeScript + Express, pensada para ser o back-end de formulários de contato em sites de portfólio. Você integra o formulário do seu site a essa API, e ela cuida do resto.

## Índice

- [Recursos](#recursos)
- [Arquitetura](#arquitetura)
- [Segurança](#segurança)
- [Referência da API](#referência-da-api)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Instalação e uso](#instalação-e-uso)
- [Tecnologias](#tecnologias)

## Recursos

- **Validação automática** dos campos de formulário _(nome, e-mail, assunto, mensagem)_, com mensagens de erro claras em _pt-BR_.
- **E-mail HTML formatado**, usando templates _Handlebars_
- **Confirmação automática** enviada de forma assíncrona via sistema de eventos, sem atrasar a resposta da API.
- **Rate limiting** por _IP_, evitando _spam_ e _abuso do seu SMTP_.
- **CORS configurável**, liberando só os domínios que você definir.
- **Tratamento de erros** claro para _JSON mal-formado_ e falhas de validação.
- **100% TypeScript**, com tipagem estrita em toda a base do código.

## Arquitetura

O projeto segue uma arquitetura em camadas, orientada a objetos. Cada pasta tem uma responsabilidade única e bem definida:

```
src/
├── controllers/   # Traduz requisição HTTP -> chamada de serviço -> resposta HTTP
├── dtos/          # Formato + regras de validação dos dados de entrada
├── events/        # Sistema de eventos internos (desacopla ações secundárias)
├── interfaces/    # Contratos de tipos compartilhados entre camadas
├── listeners/     # Reagem a eventos emitidos pelo sistema
├── middlewares/   # CORS, rate limit, validação, tratamento de erro
├── providers/     # Integrações com o "mundo externo" (SMTP, templates)
├── routes/        # Definição das rotas HTTP
├── services/      # Regra de negócio do domínio
├── templates/     # Templates HTML (.hbs) dos e-mails
└── utils/         # Funções auxiliares (formatação, etc.)
```

### Fluxo de uma requisição `POST /mail/send`

```
Cliente (formulário)
        │
        ▼
Rate Limiter          	→ bloqueia excesso de requisições por IP
        │
        ▼
Validação do DTO     	→ valida nome, e-mail, assunto e mensagem
        │
        ▼
MailController         	→ orquestra a chamada ao serviço
        │
        ▼
MailService           	→ renderiza o template e envia o e-mail principal
        │
        ├──►	Resposta HTTP (201 ou 502)
        │
        └──►	Evento "mail.sent" (assíncrono, não bloqueia a resposta)
						│
						▼
            	SendConfirmationListener → envia confirmação para o remetente
```

### Por que arquitetura em camadas, e não um único arquivo

- **Testabilidade:** cada camada pode ser testada isoladamente.
- **Extensibilidade:** adicionar um novo tipo de e-mail _(ex: newsletter)_ significa criar um novo `DTO` + `service` + `template`, sem tocar no que já existe.
- **Separação de responsabilidades:** um `Controller` nunca sabe como o e-mail é enviado; um `Provider` nunca sabe por que o e-mail está sendo enviado.

## Segurança

| Medida                                       | Onde                                                | O que resolve                                                                                                  |
| -------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Rate limiting**                            | `MailRateLimiterMiddleware`                         | Limita a 5 requisições por IP a cada 15 minutos, evitando spam/flood no seu SMTP                               |
| **CORS restritivo**                          | `CorsMiddleware`                                    | Desativado por padrão; quando ativo, libera só os domínios definidos em `CORS_ORIGIN` (nunca `*`)              |
| **Validação estrita de entrada**             | `SendMailDto` + `class-validator`                   | Rejeita campos ausentes, e-mails inválidos e mensagens fora dos limites de tamanho                             |
| **Escape automático de HTML**                | Templates Handlebars (`{{ }}`)                      | Impede que conteúdo digitado no formulário (nome, assunto, mensagem) injete HTML/scripts no e-mail renderizado |
| **Tratamento de JSON mal-formado**           | `JsonErrorMiddleware`                               | Evita vazar stack traces internos ao cliente                                                                   |
| **Limite de tamanho do corpo da requisição** | `express.json({ limit: '100kb' })`                  | Mitiga ataques de payload excessivamente grande                                                                |
| **Segredos fora do código**                  | `.env` (nunca commitado, coberto pelo `.gitignore`) | Credenciais SMTP não ficam expostas no repositório                                                             |

### Recomendações para produção

- **Sempre revogue** qualquer credencial SMTP que tenha sido exposta acidentalmente.
- Configure `CORS_ORIGIN` com o domínio real a partir do qual a API será consumida.
- Use uma senha de aplicativo específica _(não a senha principal da sua conta)_ para o SMTP, _especialmente o Gmail_.

## Referência da API

`GET /mail` - Health-check do domínio de e-mail.

`POST /mail/send` - Envia uma mensagem de contato. Dispara automaticamente um e-mail de confirmação para o remetente.

- **Cabeçalhos:** `Content-Type: application/json`

- **Corpo da requisição**:

    | Campo     | Tipo     | Regras                                    |
    | --------- | -------- | ----------------------------------------- |
    | `name`    | `string` | Obrigatório, entre 4 e 40 caracteres      |
    | `email`   | `string` | Obrigatório, precisa ser um e-mail válido |
    | `subject` | `string` | Obrigatório, entre 6 e 40 caracteres      |
    | `message` | `string` | Obrigatório, entre 6 e 10.000 caracteres  |

- **Exemplo de requisição:**

    ```json
    {
    	"name": "Bruno Coelho",
    	"email": "visitante@exemplo.com",
    	"subject": "Proposta de projeto",
    	"message": "Olá! Vi seu portfólio e gostaria de conversar sobre uma oportunidade."
    }
    ```

    - **Resposta `201` (sucesso):**

    ```json
    {
    	"message": "E-mail enviado com sucesso!",
    	"data": {
    		"name": "Bruno Coelho",
    		"email": "visitante@exemplo.com",
    		"subject": "Proposta de projeto",
    		"message": "Olá! Vi seu portfólio e gostaria de conversar sobre uma oportunidade."
    	}
    }
    ```

    - **Resposta `400` (validação falhou):**

    ```json
    {
    	"message": "Erro(s) de validação.",
    	"errors": [
    		{
    			"property": "email",
    			"constraints": {
    				"isEmail": "O endereço de e-mail está inválido."
    			}
    		}
    	]
    }
    ```

    - **Resposta `400` (JSON mal-formado):**

    ```json
    {
    	"message": "O corpo da requisição contém um JSON mal-formado."
    }
    ```

    - **Resposta `429` (limite de requisições excedido):**

    ```json
    {
    	"message": "Muitas requisições enviadas. Tente novamente em alguns minutos."
    }
    ```

    - **Resposta `502` (falha ao enviar o e-mail):**

    ```json
    {
    	"message": "Falha ao enviar o e-mail"
    }
    ```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

| Variável       | Obrigatória          | Descrição                                                                                          |
| -------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| `PORT`         | Não (padrão `3000`)  | Porta em que o servidor sobe                                                                       |
| `CORS_ENABLED` | Não (padrão `false`) | Ativa/desativa o CORS (`true`/`false`)                                                             |
| `CORS_ORIGIN`  | Não                  | Domínios liberados, separados por vírgula. Se vazio e CORS ativo, libera `http://localhost:<PORT>` |
| `SMTP_HOST`    | Sim                  | Host do servidor SMTP (ex: `smtp.gmail.com`)                                                       |
| `SMTP_PORT`    | Não (padrão `587`)   | Porta do servidor SMTP                                                                             |
| `SMTP_SECURE`  | Não (padrão `false`) | `true` para conexão TLS direta (porta 465); `false` para STARTTLS (porta 587)                      |
| `SMTP_USER`    | Sim                  | Usuário/e-mail de autenticação SMTP                                                                |
| `SMTP_PASS`    | Sim                  | Senha ou senha de aplicativo do SMTP                                                               |
| `SMTP_FROM`    | Sim                  | Endereço usado como remetente dos e-mails                                                          |

## Instalação e uso

```bash
# 1. Clonar e instalar dependências
git clone https://github.com/eubrunocoelho/mailer4me.git
cd mailer4me
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# edite o .env com suas credenciais SMTP

# 3. Rodar em desenvolvimento (com hot reload)
npm run dev

# 4. Rodar em produção
npm start

# 5. (Opcional) Checar tipos sem gerar build
npm run build
```

_Para garantir que as variáveis de ambiente sejam carregadas corretamente conforme o ambiente de execução, é necessário configurar os scripts no package.json. Certifique-se de incluir a flag --env-file=.env nos comandos de build ou execução:_

```json
// ...
"scripts": {
		"dev": "tsx watch --env-file=.env src/index.ts",
		"build": "tsc",
		"start": "tsx --env-file=.env src/index.ts"
}
// ...
```

## Tecnologias

Tecnologias utilizadas no projeto.

### Construção da API

- [Node.js](https://nodejs.org/pt-br)
- [TypeScript](https://www.typescriptlang.org/)
- [Express 5](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)
- [Handlebars](https://handlebarsjs.com/)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [cors](https://www.npmjs.com/package/cors)

### IDE, Versionamento e Deploy

- [Visual Studio Code](https://code.visualstudio.com/)
- [Insomnia](https://insomnia.rest/)
- [Git](https://git-scm.com/)
- [GitHub](https://github.com/)
- [Render](https://render.com/)

---

Desenvolvido por [@eubrunocoelho](https://github.com/eubrunocoelho).
