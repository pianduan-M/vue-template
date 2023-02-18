import { useRouter } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';

const handleError = (err) => {
  console.log(err);
};

export function useGo(_router) {
  const { push, replace } = _router || useRouter();
  function go(opt = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
  }
  return go;
}
