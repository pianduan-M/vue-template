<template>
  <div class="app-logo">
    <img class="app-logo__pic" src="~@/assets/images/logo.png" alt="app logo" />
  </div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>
<script setup></script>

<style scoped lang="scss">
  .app-logo {
    padding-left: 24px;

    &__pic {
      height: 50px;
      vertical-align: middle;
      line-height: 1;
    }
  }
</style>
