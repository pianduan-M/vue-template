import { genMessage } from '../helper';
import elementPlusLocale from 'element-plus/dist/locale/zh-cn.mjs';

const modules = import.meta.globEager('./zh_CN/**/*.ts');

export default {
  message: {
    ...genMessage(modules, 'zh_CN'),
    elementPlusLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
