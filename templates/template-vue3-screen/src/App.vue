<template>
  <!-- <router-view /> -->
  <el-config-provider :locale="getElementPlusLocale"> <ScaleLayout /></el-config-provider>
</template>

<script>
  export default {
    name: 'App',
  };
</script>
<script setup>
  import { ElConfigProvider } from 'element-plus';
  import ScaleLayout from '@/layout/ScaleLayout.vue';
  import { useLocale } from '/@/locales/useLocale';
  const { getElementPlusLocale } = useLocale();
</script>

<style lang="scss">
  @import './styles/common/style.scss';
</style>
