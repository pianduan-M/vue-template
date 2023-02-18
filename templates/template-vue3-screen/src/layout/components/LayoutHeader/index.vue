<template>
  <header class="app-header-box">
    <div class="header-item left">
      <el-space>
        <slot name="left"></slot>
      </el-space>
    </div>
    <div class="header-item center">
      <slot name="center"></slot>
    </div>
    <div class="header-item right">
      <el-space>
        <slot name="ri-left"> </slot>
        <HeaderRightSelect />
        <slot name="ri-right"> </slot>
      </el-space>
    </div>
  </header>
</template>

<script setup>
  import { HeaderRightSelect } from '@/components/HeaderRightSelect';
</script>

<style lang="scss" scoped>
  .app-header-box {
    height: 80px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #e8e8e8;
    border-radius: 0px 0px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
