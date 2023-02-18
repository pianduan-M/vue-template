import { useTimeoutFn } from '@/hooks/core/useTimeout';
import { tryOnUnmounted } from '@vueuse/core';
import { unref, nextTick, watch, computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useEventListener } from '~/src/hooks/event/useEventListener';
import echarts from '@/utils/lib/echarts';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';

export function useECharts(elRef, theme = 'default') {
  const { getCollapsed } = useMenuSetting();

  let chartInstance = null;
  let resizeFn = resize;
  const cacheOptions = ref({});
  let removeResizeFn = () => {};

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed(() => {
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    };
  });

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    // const { widthRef, screenEnum } = useBreakpoint()
    // if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
    //   useTimeoutFn(() => {
    //     resizeFn()
    //   }, 30)
    // }
  }

  function setOptions(options, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(unref(getOptions));
      }, 30);
    });
  }

  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn',
      },
    });
  }

  // watch(
  //   () => getDarkMode.value,
  //   (theme) => {
  //     if (chartInstance) {
  //       chartInstance.dispose()
  //       initCharts(theme)
  //       setOptions(cacheOptions.value)
  //     }
  //   }
  // )

  watch(getCollapsed, (_) => {
    useTimeoutFn(() => {
      resizeFn();
    }, 300);
  });

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  function getInstance() {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
}
