import { genMessage } from '../helper';
import elementPlusLocale from 'element-plus/dist/locale/en.mjs';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
    elementPlusLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
