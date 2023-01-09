module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'no-restricted-exports': 0,
    'react/jsx-filename-extension': 0,
    'default-param-last': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'no-undef': 0,
    camelcase: 0,
    'no-param-reassign': 0,
    'no-useless-escape': 0,
    'no-plusplus': 0,
    'no-unused-vars': 0,
    // 'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    // 'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
