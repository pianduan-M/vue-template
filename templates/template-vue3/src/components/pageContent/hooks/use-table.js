import { ref, computed, watch } from "vue"
import { isArray, isObject, isUndef } from "@/utils"

export const useTable = (props) => {
  // // 数据维度
  // const dimensionList = ref([])
  // const handleFilterDimension = (columns) => {
  //   const result = []
  //   columns.forEach((column) => {
  //     if (!isUndef(column.groupHidden)) {
  //       if (typeof column.groupHidden === "boolean") {
  //         result.push({
  //           label: column.label,
  //           value: column.prop,
  //           hidden: column.groupHidden,
  //         })
  //       } else if (isObject(column.groupHidden)) {
  //         const { prop, label, merge, hidden } = column.groupHidden
  //         let item = {}
  //         if (label) {
  //           item.label = label
  //         } else {
  //           // eslint-disable-next-line no-underscore-dangle
  //           const _label = label ? label : column.label
  //           item = result.find((item) => item.value === prop)
  //           item = item ? item : {}
  //           item.label = item.label ? `${item.label}/${_label}` : _label
  //         }

  //         if (prop) {
  //           item.value = prop
  //           item.keys = isArray(column.keys) ? column.keys : []
  //           item.keys.push(column.prop)
  //         } else {
  //           const existingItem = result.find((item) => {
  //             const itemValue = item.value || []
  //             if (isArray(itemValue)) {
  //               return itemValue.find((key) => key === merge)
  //             } else {
  //               return itemValue === column.prop
  //             }
  //           })
  //           item = existingItem ? existingItem : item

  //           item.value = isArray(item.value) ? item.value : []
  //           item.value.push(column.prop)
  //         }
  //         item.hidden = isUndef(hidden) ? item.hidden : hidden
  //         result.push(item)
  //       }
  //     }
  //   })
  //   dimensionList.value = result
  // }
  // watch(() => props.tableColumns, handleFilterDimension, { immediate: true })
  // // 选中的数据维度
  // const dimensionGroup = computed({
  //   get() {
  //     return dimensionList.value.filter((item) => !item.hidden).map((item) => item.label)
  //   },
  //   set(val) {
  //     dimensionList.value.forEach((item) => {
  //       if (val.find((label) => label === item.label)) {
  //         item.hidden = false
  //       } else {
  //         item.hidden = true
  //       }
  //     })
  //   },
  // })

  // // show column list
  // const showColumnList = ref([])

  // const filterShowColumnList = () =>
  //   props.tableColumns
  //     .filter((column) => {
  //       if (isUndef(column.show) && column.label) {
  //         return true
  //       }
  //       return column.show
  //     })
  //     .map((item) => item.label)

  // 表格列
  const columns = computed(() => {
    const result = []

    // props.tableColumns.map((column) => {
    //   let filterItem
    //   if (dimensionList.value.length > 0) {
    //     if (isUndef(column.groupHidden)) {
    //       filterItem = column
    //     } else {
    //       const existingItem = dimensionList.value.find((item) => {
    //         if (isArray(item.value) || isArray(item.keys)) {
    //           const list = isArray(item.value) ? item.value : item.keys
    //           return list.find((key) => key === column.prop)
    //         } else {
    //           return column.prop === item.value
    //         }
    //       })
    //       if (!existingItem.hidden) {
    //         filterItem = column
    //       }
    //     }
    //   } else if (showColumnList.value.find((label) => label === column.label)) {
    //     filterItem = column
    //   }

    //   if (filterItem) {
    //     const { groupHidden, show, ...restColumn } = filterItem
    //     result.push(restColumn)
    //   }
    // })

    return props.tableColumns
  })

  // watch(
  //   () => props.tableColumns,
  //   () => {
  //     showColumnList.value = filterShowColumnList()
  //   },
  //   { immediate: true }
  // )

  // search form 插槽
  const tableSlots = computed(() => {
    const result = []
    props.tableColumns.map((item) => {
      if (item.slot) {
        result.push(item.slot)
      }
    })
    return result
  })
  const multipleSelection = ref([])

  const onSelectionChange = (val) => {
    multipleSelection.value = val
  }

  const getTableSelectionList = (val) => {
    return [...multipleSelection.value]
  }

  return {
    // dimensionGroup,
    // dimensionList,
    columns,
    // showColumnList,
    tableSlots,
    onSelectionChange,
    getTableSelectionList,
  }
}
