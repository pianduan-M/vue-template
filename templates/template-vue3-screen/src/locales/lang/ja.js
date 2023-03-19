import { genMessage } from '../helper';
import elementPlusLocale from 'element-plus/dist/locale/ja.mjs';

const modules = import.meta.globEager('./ja/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'ja'),
    elementPlusLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
