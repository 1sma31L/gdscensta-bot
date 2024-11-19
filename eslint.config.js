import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
	// Define the parser for TypeScript
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json", // Path to your tsconfig.json
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules, // Use recommended TypeScript rules
			"@typescript-eslint/no-unused-vars": ["error"], // Custom rule: error for unused variables
			"@typescript-eslint/no-explicit-any": "warn", // Warn for usage of `any`
		},
	},
	// Common JavaScript rules (optional if you mix JavaScript with TypeScript)
	{
		files: ["**/*.js"],
		languageOptions: {
			ecmaVersion: "latest",
		},
		rules: {
			"no-unused-vars": "warn",
		},
	},
];
