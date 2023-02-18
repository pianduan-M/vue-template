<template>
  <div>
    <LayoutHeader>
      <template #left>
        <AppLogo />
      </template>
    </LayoutHeader>
    <div class="app-main">
      <LayoutTransitionMain />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
  };
</script>
<script setup>
  import { LayoutHeader } from './components/LayoutHeader';
  import { LayoutTransitionMain } from './components/LayoutTransitionMain';
  import { AppLogo } from '@/components/AppLogo';
</script>

<style scoped lang="scss">
  .app-main {
    height: calc(100% - 80px);
    background: #f9f9f9;
    overflow: hidden;
  }
</style>
