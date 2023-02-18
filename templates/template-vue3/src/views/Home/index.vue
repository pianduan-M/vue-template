<template>
  <div>
    <h2>Home Page</h2>
    <p>
      {{ userInfo }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'HomePage',
  };
</script>
<script setup>
  import { fetchAccountInfo } from '@/api/demo';

  const userInfo = ref({});

  const getAccountInfo = async () => {
    try {
      const { data } = await fetchAccountInfo();
      userInfo.value = data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  getAccountInfo();
</script>

<style scoped lang="scss"></style>
