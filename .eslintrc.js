module.exports = {
  extends: ['@mengjx/eslint-config-vue', 'plugin:prettier/recommended'],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-undef': 'off',
    'import/no-unresolved': 'off',
    'no-console': 0,
    'no-debugger': 1,
    curly: 0,
    '@typescript-eslint/brace-style': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }],
    'vue/no-unused-vars': 0,
    'vue/no-extra-parens': 0,
    'vue/v-on-event-hyphenation': 0,
    'prefer-promise-reject-errors': 0,
  },
}
