import 'reflect-metadata';

import { app } from './app.ts';

/**
 * Ponto de entrada da aplicação.
 *
 * @remarks
 * `reflect-metadata` é um requisito do `class-validator`/`class-transformer` para ler os metadados gerados
 * pelos decorators em tempo de execução.
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
