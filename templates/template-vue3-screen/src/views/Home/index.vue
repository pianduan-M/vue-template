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
    <el-button />
    <el-date-picker />
    <el-select @change="onChange">
      <el-option
        v-for="item in localeList"
        :key="item.event"
        :label="item.text"
        :value="item.event"
      />
    </el-select>
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
  import { localeList } from '@/settings/localeSetting.js';
  import { useLocale } from '@/locales/useLocale.js';
  import { useLocaleStore } from '@/store/modules/locale.js';

  const { changeLocale } = useLocale();
  const localeStore = useLocaleStore();

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

  const onChange = (value) => {
    console.log(value, 'vvvv');
    const locale = changeLocale(value);
    localeStore.setLocaleInfo(locale);
  };
</script>

<style scoped lang="scss">
  .right {
    width: 720px;
    height: 600px;
    background-color: pink;
  }
</style>
