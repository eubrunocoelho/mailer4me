import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

import prettierOptions from './.prettierrc.json' with { type: 'json' };

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, prettierConfig, {
	plugins: {
		prettier: prettierPlugin,
		'simple-import-sort': simpleImportSort,
	},
	rules: {
		'prettier/prettier': ['warn', prettierOptions],
		'simple-import-sort/imports': 'warn',
		'simple-import-sort/exports': 'warn',
		'no-unused-vars': 'warn',
		'no-console': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-inferrable-types': 'warn',
	},
});
