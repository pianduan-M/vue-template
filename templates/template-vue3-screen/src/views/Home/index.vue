<template>
  <div>
    <h2>Home Page</h2>
    <p>
      {{ userInfo }}
    </p>
    <div class="flex">
      <MapWrapper>
        <HomeBaseMap />
      </MapWrapper>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomePage',
  };
</script>
<script setup>
  import HomeBaseMap from '@/components/MapWrapper/HomeBaseMap.vue';

  import { MapWrapper } from '@/components/MapWrapper';
  import { fetchAccountInfo } from '@/api/demo';

  const userInfo = ref({});

  const getAccountInfo = async () => {
    try {
      const { data } = await fetchAccountInfo();
      userInfo.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  getAccountInfo();
</script>

<style scoped lang="scss">
  .right {
    width: 720px;
    height: 600px;
    background-color: pink;
  }
</style>
