module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      // Targeting Node.js files specifically
      files: ['vite.config.ts', '*.config.ts', 'scripts/**/*.ts'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest', // or a specific ECMAScript version
      },
      env: {
        node: true, // This enables Node.js global variables
        browser: false,
      },
      plugins: ['node'],
      extends: [
        'plugin:node/recommended',
      ],
      rules: {
        // Node.js specific rules or overrides
        '@typescript-eslint/no-var-requires': 'off', // if using commonjs requires
        'node/no-unpublished-import': 'off', // if using ESM imports
        'node/no-unsupported-features/es-syntax': ['error', {
          ignores: ['modules'], // Allows usage of ES Modules
        }],
      },
    }
  ]
}
