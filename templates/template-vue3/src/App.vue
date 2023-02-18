<template>
  <div>
    <div class="flex-center">
      <button @click="handleToHome">Home</button>
      <span>|</span>
      <button @click="handleToAbout">About</button>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>
<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const handleToHome = () => {
    router.push('/home');
  };
  const handleToAbout = () => {
    router.push('/about');
  };
</script>

<style scoped lang="scss">
  @import './styles/common/style.scss';
</style>
