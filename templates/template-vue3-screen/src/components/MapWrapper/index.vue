<template>
  <div class="scale-map-wrapper" :style="wrapperStyle">
    <div class="w-full h-full scale-map-box" ref="mapWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MapWrapper',
  };
</script>
<script setup>
  import { useThrottleFn } from '@vueuse/core';
  import { isString } from '@/utils';

  const props = defineProps({
    width: {
      type: [String, Number],
      default: '1200px',
    },
    height: {
      type: [String, Number],
      default: '600px',
    },
  });

  const wrapperStyle = computed(() => {
    const width = isString(props.width) ? props.width : props.width + 'px';
    const height = isString(props.height) ? props.height : props.height + 'px';

    return {
      width,
      height,
    };
  });

  const mapWrapper = ref();
  let preScale = {
    width: 1,
    height: 1,
  };
  const screenScale = inject(['scale']);

  const resizeMap = useThrottleFn(() => {
    const map = mapWrapper.value;
    if (!map) return;

    const scale = screenScale.value;
    const { offsetWidth, offsetHeight } = map;

    // 每次响应式，根据上次缩放比例计算是地图的设计宽高 offsetWidth / preScale
    const newWidth = (offsetWidth / preScale.width) * scale.width;
    const newHeight = (offsetHeight / preScale.height) * scale.height;

    map.style.transform = `scale(${1 / scale.width}, ${1 / scale.height})`; // 还原map到实际大小
    map.style.width = newWidth + 'px';
    map.style.height = newHeight + 'px';
    preScale = scale;
  }, 200);

  watch(() => screenScale, resizeMap);

  onMounted(resizeMap);
</script>

<style scoped lang="scss">
  .scale-map-wrapper {
    .scale-map-box {
      transform-origin: 0 0;
    }
  }
</style>
