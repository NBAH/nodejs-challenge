module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-implicit-any': 'off',
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'no-extra-semi': 'error',
        'comma-style': 'error',
        'no-unused-expressions': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        'no-var': 'error',
        'semi': 'error',
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
        'no-use-before-define': 'error',
        'no-trailing-spaces': ['error', { 'ignoreComments': true }]
    },
};
