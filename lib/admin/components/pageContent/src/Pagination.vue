<template>
  <div class="pagination-container" :class="paginationPosition">
    <el-pagination
      :total="modelValue.total"
      :current-page="modelValue.page"
      :page-size="modelValue.size"
      v-bind="config"
      @size-change="onSizeChange"
      @current-change="onPageChange"
      @prev-click="onPageChange"
      @next-click="onPageChange"
    ></el-pagination>
  </div>
</template>

<script>
const defaultConfig = {
  background: true,
  layout: "prev, pager, next, sizes",
  pageSizes: [15, 30, 50, 100],
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    paginationConfig: {
      type: Object,
      default: () => ({}),
    },
    paginationPosition: {
      type: String,
      default: "end",
    },
  },
  data() {
    return {}
  },
  computed: {
    config() {
      const result = {
        ...defaultConfig,
        ...this.paginationConfig,
      }
      return result
    },
  },
  mounted() {
    console.log(this.modelValue, "modelValue")
  },
  methods: {
    onSizeChange(size) {
      const value = { ...this.modelValue, littleof_size: size }
      this.$emit("update:modelValue", value)
      this.$emit("change", value)
    },
    onPageChange(page) {
      const value = { ...this.modelValue, littleof_pagenum: page }
      this.$emit("update:modelValue", value)
      this.$emit("change", value)
    },
  },
}
</script>

<style scoped lang="scss">
.pagination-container {
  margin: 30px 0;
  display: flex;
  justify-content: flex-end;

  &.end {
    justify-content: flex-end;
  }
  &.start {
    justify-content: flex-start;
  }
  &.center {
    justify-content: center;
  }
}
</style>
