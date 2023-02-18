<template>
  <div :class="[ns.b()]" @click="goHome">
    <img :class="[ns.e('pic')]" src="../../../assets/images/logo.png" />
    <div class="ml-2 truncate md:opacity-100" :class="[ns.e('title')]" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppLogo',
  };
</script>

<script setup>
  import { useGlobSetting } from '@/hooks/setting';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { useUserStore } from '@/store/modules/user';
  import { useNamespace } from '@/hooks/web/useNameSpace';

  defineProps({
    /**
     * The theme of the current parent component
     */
    theme: { type: String, validator: (v) => ['light', 'dark'].includes(v) },
    /**
     * Whether to show title
     */
    showTitle: { type: Boolean, default: true },
    /**
     * The title is also displayed when the menu is collapsed
     */
    alwaysShowTitle: { type: Boolean },
  });

  const userStore = useUserStore();
  const { title } = useGlobSetting();
  const go = useGo();

  function goHome() {
    go(userStore.getUserInfo?.homePath || PageEnum.BASE_HOME);
  }

  const ns = useNamespace('app-logo');
</script>
<style lang="scss" scoped>
  @import '@/styles/common/mixins.scss';

  @include b(app-logo) {
    display: flex;
    align-items: center;
    width: 60%;
    height: 80px;

    @include e(pic) {
      height: 48px;
      object-fit: contain;
    }

    @include e(title) {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
      color: white;
    }
  }
</style>
