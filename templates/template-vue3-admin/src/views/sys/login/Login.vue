<template>
  <div class="relative w-full h-full px-4" :class="[ns.b()]">
    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo class="-enter-x" />
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            :class="[ns.e('form')]"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
  };
</script>
<script setup>
  import { AppLogo } from '@/components/Application';

  import { useNamespace } from '@/hooks/web/useNamespace.js';

  const ns = useNamespace('login');
</script>

<style lang="scss">
  @import '@/styles/common/mixins.scss';

  @include b(login) {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url('@/assets/svg/login-bg.svg');
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      content: '';
    }
  }
</style>
