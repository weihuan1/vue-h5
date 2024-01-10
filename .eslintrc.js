module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unsafe-enum-comparison': 0
  }
}
