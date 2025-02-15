import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    //'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(calendar|button|ripple|spinner).js',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // 전부 변경 끝나시면 main-color, secondary-color 줄 삭제
        'main-color': '#ffb806',
        'secondary-color': '#2f00ff',
        // Primary
        'primary-color-900': '#050300',
        'primary-color-800': '#382600',
        'primary-color-700': '#6b4900',
        'primary-color-600': '#9e6b00',
        'primary-color-500': '#d18e00',
        'primary-color-400': '#ffaf05',
        'primary-color-300': '#ffbf38',
        'primary-color-200': '#ffcf6b',
        'primary-color-100': '#ffe09e',
        'primary-color-50': '#fff0d1',
        // Secondary
        'secondary-color-900': '#010104',
        'secondary-color-800': '#070f31',
        'secondary-color-700': '#0d1d5e',
        'secondary-color-600': '#142b84',
        'secondary-color-500': '#1a3ab7',
        'secondary-color-400': '#264be0',
        'secondary-color-300': '#516fe6',
        'secondary-color-200': '#7e94ec',
        'secondary-color-100': '#aab9f3',
        'secondary-color-50': '#d7def9',
        // Grayscale
        'grayscale-color-900': '#141414',
        'grayscale-color-800': '#2e2e2e',
        'grayscale-color-700': '#474747',
        'grayscale-color-600': '#616161',
        'grayscale-color-500': '#7a7a7a',
        'grayscale-color-400': '#949494',
        'grayscale-color-300': '#adadad',
        'grayscale-color-200': '#c7c7c7',
        'grayscale-color-100': '#e0e0e0',
        'grayscale-color-85': '#e8e8e8',
        'grayscale-color-70': '#f4f4f4',
        'grayscale-color-65': '#fbfbfb',
        'grayscale-color-50': '#fafafa',
        // Symentic Red Error
        'symentic-red-color-900': '#D21C1C',
        'symentic-red-color-800': '#DF1D1D',
        'symentic-red-color-700': '#E7301D',
        'symentic-red-color-600': '#E9462B',
        'symentic-red-color-500': '#F5511D',
        'symentic-red-color-400': '#F05C2E',
        'symentic-red-color-300': '#EB683F',
        'symentic-red-color-200': '#F57046',
        'symentic-red-color-100': '#FF784D',
        'symentic-red-color-70': '#FF9D7E',
        'symentic-red-color-50': '#FFC2AF',
      },
      scrollbar: ['hidden'],
      boxShadow: {
        'header-mobile': '0px 5px 14px 0px rgba(0, 0, 0, 0.04)',
        'header-web': '0px 2px 3.8px 0px rgba(0, 0, 0, 0.06)',
        'tap-menu': '0px -1px 5.3px 0px rgba(0, 0, 0, 0.11)',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#ffaf05',
            },
          },
        },
      },
    }),
  ],
};
export default config;
