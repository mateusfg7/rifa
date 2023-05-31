module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'prefer-const': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off'
  }
}
