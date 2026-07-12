import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import Handlebars, { type TemplateDelegate } from 'handlebars';

/**
 * Compila e renderiza templates Handlebars (`.hbs`) armazenados em
 * `src/templates/`, usados para gerar o corpo HTML dos e-mails.
 */
export class TemplateRendererProvider {
	private static readonly templatesDir = join(process.cwd(), 'src', 'templates');
	private static readonly cache = new Map<string, TemplateDelegate>();

	/**
	 * Renderiza um template com os dados informados.
	 *
	 * @param templateName - Nome do arquivo `.hbs`, sem a extensão (ex: `"mail-confirmation"`)
	 * @param data - Dados injetados nas variáveis `{{ }}` do template
	 * @returns HTML já renderizado, pronto para ser usado no campo `html` do e-mail
	 */
	static render(templateName: string, data: Record<string, unknown>): string {
		const template = TemplateRendererProvider.getTemplate(templateName);

		return template(data);
	}

	/**
	 * Retorna o template compilado, buscando no cache antes de ler o arquivo
	 * do disco novamente.
	 *
	 * @param templateName - Nome do arquivo `.hbs`, sem a extensão
	 */
	private static getTemplate(templateName: string): TemplateDelegate {
		const cached = TemplateRendererProvider.cache.get(templateName);

		if (cached) {
			return cached;
		}

		const filePath = join(TemplateRendererProvider.templatesDir, `${templateName}.hbs`);
		const source = readFileSync(filePath, 'utf-8');
		const compiled = Handlebars.compile(source);

		TemplateRendererProvider.cache.set(templateName, compiled);

		return compiled;
	}
}
