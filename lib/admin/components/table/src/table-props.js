import { isObject } from "@/utils"

export let globalTableDefaultProps = {}

export function setTableGlobalDefaultProps(options = {}) {
  if (!isObject(options)) return
  globalTableDefaultProps = { ...globalTableDefaultProps, ...options }
}

export const tableProps = {
  // 表格列配置项
  columns: {
    type: Array,
    default() {
      return []
    },
  },
  // 应用到每一列的公共 props
  commonColumnOptions: {
    type: Object,
    default() {
      return {}
    },
  },
  // 传递异步数据，在 vue3 中已经没有什么用了，可以传递一个
  selectOptionMap: {
    type: Object,
    default() {
      return {}
    },
  },
  // 默认值
  nullValueDefault: {
    default: "-",
  },
}

export default {}
