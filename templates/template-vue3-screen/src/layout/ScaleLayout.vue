<template>
  <div class="main" ref="previewRef">
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScaleLayout',
  };
</script>
<script setup>
  import { useScreenScale } from '@/hooks/scale/useScreenScale.js';
  import { PreviewScaleEnum } from '@/enums/styleEnum.js';

  const { previewRef, scale } = useScreenScale({ scaleType: PreviewScaleEnum.SCROLL_Y });

  provide('scale', scale);
</script>

<style lang="scss">
  .main {
    position: relative;
    transform-origin: center top;
  }

  .wrapper {
    position: relative;
    width: 1920px;
    height: 1080px;
  }

  #app {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    // align-items: center;
    overflow: hidden;
  }
</style>
