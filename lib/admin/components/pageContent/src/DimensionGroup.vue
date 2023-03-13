<template>
  <div class="">
    <el-checkbox-group v-model="selectGroup" size="small">
      <el-checkbox-button v-for="item in dimensionList" :key="item.label" :label="item.label">{{ item.label }}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "DimensionGroup",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    dimensionList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    selectGroup: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit("update:modelValue", val)
      },
    },
  },
}
</script>

<style scoped lang="scss"></style>
