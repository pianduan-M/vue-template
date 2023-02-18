import { ElButton } from 'element-plus';

const components = [ElButton];

export const registerElementPlus = (app) => {
  components.forEach((c) => {
    app.use(c);
  });
};
