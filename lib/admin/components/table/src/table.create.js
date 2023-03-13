import { h, resolveComponent } from "vue"
import { isObject, isFunction, isArray, isString, isVNode, formatRowDataByKey, isDef } from "@/utils"
import { columnTypeList, isNativeColumnType, handleColumnTypeByEnum } from "./column-type"
import TableHeadTips from "./TableHeadTips.vue"

// 创建列
export function createTableColumn(columns, commonColumnOptions) {
  if (!isArray(columns)) {
    throw new Error("table option columns must a array")
  }
  return columns.map((column) => {
    const ElTableColumn = resolveComponent("ElTableColumn")
    if (!ElTableColumn) {
      throw new Error("ElTableColumn must register global component")
    }

    const { children, slot, formatter, unit, renderHeaderTips, columnTypeOptions, ...props } = column

    // 如果有 children 递归调用
    if (children && Array.isArray(children)) {
      const childrenNode = createTableColumn.call(this, children, commonColumnOptions)
      return h(
        ElTableColumn,
        {
          ...commonColumnOptions,
          ...props,
          key: column.prop,
        },
        childrenNode
      )
    } else {
      const columnContent = !isNativeColumnType(column.type) ? createTableColumnContent.call(this, column) : ""

      return h(
        ElTableColumn,
        {
          ...commonColumnOptions,
          ...props,
          key: column.prop,
        },
        columnContent
      )
    }
  })
}

// 创建列内容
export function createTableColumnContent(column) {
  let resultSlots = {}

  switch (true) {
    // 如果是函数 返回结果直接应用innerHTML
    case isFunction(column.slot):
      resultSlots = createSlotByFunctionType.call(this, column.slot, column)
      break
    case isObject(column.slot):
      Object.keys(column.slot).map((key) => {
        const value = column.slot[key]
        if (isFunction(value)) {
          resultSlots[key] = createSlotByFunctionType.call(this, value, column)
        } else {
          resultSlots[key] = createSlotByStringType.call(this, value)
        }
      })
      break
    // 如果是 字符串类型 就当做是插槽名使用
    case isString(column.slot):
      resultSlots.default = createSlotByStringType.call(this, column.slot, column)
      // 没有 slot 当做普通列 调用 formatter 和 拼接 unit
      break
    default:
      resultSlots.default = createDefaultSlot.call(this, column)
  }

  // 判断是否有 renderHeaderTips
  if (column.renderHeaderTips && isFunction(column.renderHeaderTips)) {
    resultSlots.header = createTableColumnHeaderTips.call(this, column)
  }

  return resultSlots
}

// if slot is function vNode or html string
function createSlotByFunctionType(slot, column) {
  return ({ row }) => {
    const result = slot(row, column)
    switch (true) {
      // if result is vNode
      case isVNode(result):
        return result
      // if result is html string
      case isString(result):
        return h("div", { domProps: { innerHTML: result } })
      // if result is component or dom
      case isObject(result):
        const { component, ...rest } = result
        // eslint-disable-next-line no-underscore-dangle
        let _component = component
        if (isString(_component)) {
          _component = resolveComponent(component) || component
        }
        return h(_component, rest)
      default:
    }
  }
}

// if slot is string
function createSlotByStringType(slot) {
  const scopedSlot = this.$slots[slot]
  if (scopedSlot) {
    return function helper(props) {
      return scopedSlot(props)
    }
  } else {
    return () => this.nullValueDefault
  }
}

// table column default
function createDefaultSlot(column) {
  return ({ row }) => {
    let value
    if (column.prop) {
      value = formatRowDataByKey(column.prop, row)
    }

    // 有枚举配置调用处理方法
    if (column.enum) {
      return handleColumnTypeByEnum.call(this, row, column, value)
    }

    // 如果有指定列类型 直接调用注册过的处理方法
    const { type } = column
    if (type) {
      const handler = columnTypeList[type]
      if (handler) {
        return handler.call(this, { row, column, value })
      }
    }

    // 普通数据
    value = isDef(value) && value !== "" ? value : this.nullValueDefault
    if (column.formatter && isFunction(column.formatter)) {
      value = column.formatter(row, value)
    }
    return value + (column.unit ? column.unit : "")
  }
}

// 创建 表头 tips
function createTableColumnHeaderTips(column) {
  return () => {
    const content = column.renderHeaderTips()
    const label = column.label
    return h(TableHeadTips, { content, label })
  }
}

export default {}
