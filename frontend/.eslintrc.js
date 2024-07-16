module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'import', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'react/react-in-jsx-scope': 'off', // Disable this rule
    },
    settings: {
        react: {
            version: 'detect',
            pragma: 'React',
            fragment: 'Fragment',
        },
    },
    overrides: [
        {
            files: ['*.config.ts', '*.config.js', 'cypress/**'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
    ignorePatterns: ['.eslintrc.js'],
};
