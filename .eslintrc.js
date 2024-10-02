module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  // plugins: ['prettier', 'unused-imports'],
  plugins: ['prettier'],
  rules: {
    // 선언되지 않은 변수 또는 임포트 구문 정리 규칙
    'no-undef': 'off',
    // 'unused-imports/no-unused-imports': 'error',

    // 프리티어 설정
    // 'prettier/prettier': [
    //     'error',
    //     {
    //         singleQuote: true,
    //         semi: true,
    //         tabWidth: 4,
    //         trailingComma: 'all',
    //         printWidth: 80,
    //         bracketSpacing: true,
    //         arrowParens: 'avoid',
    //         endOfLine: 'auto',
    //     },
    // ],
  },
  globals: {
    RequestInit: 'readonly',
  },
};
