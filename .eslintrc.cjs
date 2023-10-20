module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:valtio/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/prop-types': 0,
    "react/display-name": 0,
    'react/no-unknown-property': ['error', { ignore: ['clstag'] }],
    'valtio/avoid-this-in-proxy': 'error',
    '@typescript-eslint/ban-ts-comment': 0,
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off'//TODO any目前太多，后续删除掉
  },
}
