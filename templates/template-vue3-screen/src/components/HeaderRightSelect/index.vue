<template>
  <div class="header-right-select">
    <el-space>
      <span>Admin</span>
      <el-icon class="header-select__UserFilled" color="#333333"><UserFilled /></el-icon>

      <el-dropdown :teleported="false">
        <span class="el-dropdown-link">
          Dropdown List
          <el-icon class="el-icon--right">
            <ArrowDownBold />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>前往后台</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-space>
  </div>
</template>

<script>
  export default {
    name: 'HeaderRightSelect',
  };
</script>
<script setup>
  import { UserFilled, ArrowDownBold } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
  .header-right-select {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;

    .el-icon--right {
      vertical-align: -0.15em;
    }
  }

  .header-select__UserFilled {
    font-size: 20px;
  }
</style>
