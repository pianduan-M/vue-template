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
  import { useMessage } from '@/hooks/web/useMessage.js';

  const { createInfoModal } = useMessage();

  const userInfo = ref({});

  const getAccountInfo = async () => {
    try {
      const { data } = await fetchAccountInfo();
      userInfo.value = data;
      createInfoModal({ message: '失败' });
    } catch (error) {
      console.log(error);
    }
  };

  getAccountInfo();
</script>

<style scoped lang="scss"></style>
