import { ref, onMounted, onUnmounted } from 'vue';
import {
  usePreviewFitScale,
  usePreviewScrollYScale,
  usePreviewScrollXScale,
  usePreviewFullScale,
} from './usePreviewScale';
import { PreviewScaleEnum } from '@/enums/styleEnum';

export const useScreenScale = ({ scaleType, designWidth = 1920, designHeight = 1080 }) => {
  const entityRef = ref();
  const previewRef = ref();
  const width = ref(designWidth);
  const height = ref(designHeight);
  const scale = ref({
    width: 1,
    height: 1,
  });

  // 屏幕适配
  onMounted(() => {
    entityRef.value = document.getElementById('app');
    switch (scaleType) {
      case PreviewScaleEnum.FIT:
        (() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewFitScale(
            width.value,
            height.value,
            previewRef.value,
            (calcScale) => {
              scale.value = calcScale;
            },
          );
          calcRate();
          windowResize();
          onUnmounted(() => {
            unWindowResize();
          });
        })();
        break;
      case PreviewScaleEnum.SCROLL_Y:
        (() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewScrollYScale(
            width.value,
            height.value,
            previewRef.value,
            (calcScale) => {
              // 高分辨率下整个容器会被撑大 设置实际高度避免多余空白滚动
              const dom = entityRef.value;
              dom.style.width = `${width.value * calcScale.width}px`;
              dom.style.height = `${height.value * calcScale.height}px`;
              scale.value = calcScale;
            },
          );
          calcRate();
          windowResize();
          onUnmounted(() => {
            unWindowResize();
          });
        })();

        break;
      case PreviewScaleEnum.SCROLL_X:
        (() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewScrollXScale(
            width.value,
            height.value,
            previewRef.value,
            (calcScale) => {
              const dom = entityRef.value;
              dom.style.width = `${width.value * calcScale.width}px`;
              dom.style.height = `${height.value * calcScale.height}px`;
              scale.value = calcScale;
            },
          );
          calcRate();
          windowResize();
          onUnmounted(() => {
            unWindowResize();
          });
        })();

        break;
      case PreviewScaleEnum.FULL:
        (() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewFullScale(
            width.value,
            height.value,
            previewRef.value,
            (calcScale) => {
              scale.value = calcScale;
            },
          );
          calcRate();
          windowResize();
          onUnmounted(() => {
            unWindowResize();
          });
        })();
        break;
    }
  });

  return {
    entityRef,
    previewRef,
    scale,
  };
};

export const useScreenScaleByX = ({ designWidth = 1920, designHeight = 1080 }) => {
  const previewRef = ref();
  const scale = ref({
    width: 1,
    height: 1,
  });

  const calcRate = () => {
    if (scaleDom.value) {
      const scaleX = parseFloat((window.innerHeight / designWidth).toFixed(5));

      scale.value = {
        width: scaleX,
        height: scaleX,
      };
      scaleDom.value.style.transform = `scale(${scaleX})`;
    }
  };

  return {
    previewRef,
  };
};
