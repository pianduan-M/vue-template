<template>
  <div class="page-header" v-if="showSearchForm">
    <PdSearchForm
      :gutter="20"
      label-suffix=":"
      :formItems="searchFormItems"
      input-class="search-input"
      v-model="_queryParams"
      :size="size"
      v-bind="searchFromProps"
    >
      <!-- 透传 slot 给search-form -->
      <template v-for="slot in searchFormItemSlots" #[slot]="data" :key="slot">
        <slot :name="slot" v-bind="data" />
      </template>

      <template #before>
        <slot name="searchFormBefore" />
      </template>

      <template #after>
        <el-button :size="size" type="primary" @click="onSearch" v-if="searchFormItems.length">搜索</el-button>
        <el-button :size="size" v-if="exportUrl" @click="onExportClick">导出</el-button>
        <el-button :size="size" v-if="showAddBtn" @click="emit('on-add')">新增</el-button>
        <el-button :size="size" type="danger" text bg v-if="showDelBtn" @click="emit('on-delete')">删除</el-button>
      </template>
    </PdSearchForm>
  </div>
  <div class="page-table" v-loading="loading">
    <!-- <DimensionGroupVue v-if="dimensionList.length" v-model="dimensionGroup" :dimensionList="dimensionList" />
    <FilterColumn v-if="!dimensionList.length" v-model:showColumnList="showColumnList" :columns="tableColumns" /> -->

    <PdTable :columns="columns" :data="tableData" :summary-method="getSummaries" @selection-change="onSelectionChange" style="width: 100%">
      <!-- 透传 slot 给search-form -->
      <template v-for="slot in tableSlots" #[slot]="data" :key="slot">
        <slot :name="slot" v-bind="data" />
      </template>
    </PdTable>
  </div>
  <div class="pagination-box" v-if="showPagination">
    <Pagination v-model="_queryParams" @change="onSearch" :paginationPosition="$attrs.paginationPosition" />
  </div>
</template>

<script>
import { defineProps, defineEmits, defineExpose, provide } from "vue"

export default {
  name: "PageContent",
}
</script>

<script setup>
import { Search, Download, Setting } from "@element-plus/icons-vue"
import DimensionGroupVue from "./DimensionGroup.vue"
import Pagination from "./Pagination.vue"
import FilterColumn from "./FilterColumn.vue"
import pageContentProps from "./page-content-props"
import { useSearchForm, useTable, useRequest, useTableSum } from "../hooks"

const props = defineProps(pageContentProps)
const emit = defineEmits(["reset", "on-add"])

// search form
const { searchFormItemSlots, _queryParams, getQueryParams, resetQueryParams } = useSearchForm(props)

// table
const { dimensionGroup, dimensionList, columns, showColumnList, tableSlots, onSelectionChange, getTableSelectionList } = useTable(props)

// 发送请求
const { tableData, getTableData, onExportClick, loading } = useRequest({
  props,
  _queryParams,
  getQueryParams,
})
// 搜索
const onSearch = (params = {}) => {
  getTableData({ ...getQueryParams(), ...params })
}
// 重置
const handleResetQueryParams = () => {
  emit("reset")
  resetQueryParams()
  onSearch()
}

onSearch()

// 总计行
const { getSummaries } = useTableSum({ columns })

defineExpose({
  onSearch,
  getQueryParams,
  getTableData,
  getTableSelectionList,
  onExportClick,
})

// 共享表格查询方法给子孙元素
provide("getTableData", onSearch)
</script>

<style scoped lang="scss">
.page-header {
  margin: 20px 0;
}

.page-table {
  margin: 20px 0;
}

.pagination-box {
  display: flex;
  justify-content: center;
}
</style>
