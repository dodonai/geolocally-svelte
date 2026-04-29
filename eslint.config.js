import svelte from 'eslint-plugin-svelte';

const browserGlobals = {
	document: 'readonly',
	localStorage: 'readonly',
	window: 'readonly'
};

export default [
	{
		ignores: ['build/**', '.svelte-kit/**', 'node_modules/**', 'docs/google-apps-script.js']
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...browserGlobals,
				gtag: 'readonly',
				process: 'readonly'
			}
		},
		rules: {
			'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
		}
	},
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			globals: {
				...browserGlobals,
				gtag: 'readonly'
			}
		}
	}
];
