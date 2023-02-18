import { defineConfig } from 'unocss';

export default defineConfig({
  exclude: [
    'node_modules',
    '.git',
    '.github',
    '.husky',
    '.vscode',
    'build',
    'dist',
    'mock',
    'public',
    './stats.html',
  ],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        primary: primaryColor,
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
    },
  },
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['absolute-lt', 'absolute left-0 top-0'],
    ['absolute-lb', 'absolute left-0 bottom-0'],
    ['absolute-rt', 'absolute right-0 top-0'],
    ['absolute-rb', 'absolute right-0 bottom-0'],
    ['absolute-center', 'absolute-lt f-c-c wh-full'],
    ['text-ellipsis', 'truncate'],
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    [
      'card-shadow',
      { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' },
    ],
  ],
});
