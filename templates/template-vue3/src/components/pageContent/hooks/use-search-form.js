import { computed, ref, isRef, defineEmits } from "vue"
import { writeFileAsync } from "@/utils"

export const useSearchForm = (props) => {
  // search form 插槽
  const searchFormItemSlots = computed(() => {
    const result = []
    props.searchFormItems.map((item) => {
      if (item.slotName) {
        result.push(item.slotName)
      } else if (item.labelSlotName) {
        result.push(item.labelSlotName)
      }
    })
    return result
  })

  // 搜索参数
  // eslint-disable-next-line no-underscore-dangle
  const _queryParams = ref({
    littleof_pagenum: 1,
    littleof_size: 10,
  })
  const searchFormData = computed(() => {
    let result
    if (props.queryParams) {
      const queryParams = isRef(props.queryParams) ? props.queryParams.value : props.queryParams
      result = { ...queryParams, ..._queryParams.value }
    } else {
      result = { ..._queryParams.value }
    }
    return result
  })
  const getQueryParams = () => searchFormData.value

  // 重置参数
  const resetQueryParams = () => {
    _queryParams.value = { littleof_pagenum: 1, littleof_size: 10 }
  }

  return {
    searchFormItemSlots,
    _queryParams,
    getQueryParams,
    resetQueryParams,
  }
}
