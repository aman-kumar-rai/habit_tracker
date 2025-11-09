import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
  // replacement of .eslintignore
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage', 'public'],
  },

  // recommended js configs, same as eslint:recommended
  js.configs.recommended,

  // Type-aware TS configs aligned with strict tsconfig
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      // Pure Node environment (no Web APIs)
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Mirror tsconfig intent
      // - noImplicitReturns
      'consistent-return': 'error',
      // - noFallthroughCasesInSwitch
      'no-fallthrough': 'error',
      // Allow server logging
      'no-console': 'off',

      // - noUnusedLocals / noUnusedParameters (align with TS behavior; ignore prefixed _)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // - verbatimModuleSyntax: prefer type-only imports/exports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',

      // Express-friendly promise rules
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    },
  },

  // makes sure eslint doesn't conflict with prettier
  prettier,
];
