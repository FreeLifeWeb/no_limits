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
    'react/destructuring-assignment': 0,
    'no-return-assign': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-no-useless-fragment': 0,
    'no-nested-ternary': 0,
    'no-alert': 0,
  },
};
