import { isArray, isString } from '@/utils';

export function useImageViewer() {
  const isShow = ref(false);
  const urlList = ref([]);
  const initialIndex = ref(0);

  const handleShowImageViewer = (urls, index = 0) => {
    if (isString(urls)) {
      urlList.value = [urls];
    } else if (isArray(urls)) {
      urlList.value = urls;
    }
    initialIndex.value = index;
    isShow.value = true;
  };

  const onCloseImageViewer = () => {
    isShow.value = false;
  };

  return {
    isShow,
    urlList,
    handleShowImageViewer,
    onCloseImageViewer,
    initialIndex,
  };
}
