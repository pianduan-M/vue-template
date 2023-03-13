<template>
  <el-tooltip effect="light" :content="content" placement="top">
    <span class="tip-trigger">
      <span>{{ label }}</span>
      <span class="tips-icon"><QuestionFilled :style="styles" /></span>
    </span>
  </el-tooltip>
</template>

<script>
import { QuestionFilled } from "@element-plus/icons-vue"

export default {
  name: "TableHeadTips",
  components: { QuestionFilled },
  props: {
    content: {
      default: "",
    },
    label: {
      default: "",
    },
  },
  computed: {
    styles() {
      return {
        width: "1em",
        marginLeft: "4px",
      }
    },
  },
}
</script>

<style scoped lang="scss">
.tip-trigger {
  position: relative;

  .tips-icon {
    position: absolute;
    top: 0%;
    left: 100%;
    height: 100%;
  }
}
</style>
