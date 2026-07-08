import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import Handlebars, { type TemplateDelegate } from 'handlebars';

export class TemplateRendererProvider {
	private static readonly templatesDir = join(process.cwd(), 'src', 'templates');
	private static readonly cache = new Map<string, TemplateDelegate>();

	static render(templateName: string, data: Record<string, unknown>): string {
		const template = TemplateRendererProvider.getTemplate(templateName);

		return template(data);
	}

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
