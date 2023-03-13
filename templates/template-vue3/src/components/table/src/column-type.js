import { h, isRef } from "vue"
import { isFunction, isArray, isString, isObject, formatRowDataByKey } from "@/utils"

// 储存 column type
export const columnTypeList = {}

// 储存注册的 plugin
export const tablePluginList = []

export function use(fn, options = {}) {
  if (!isFunction(fn)) {
    throw new TypeError("table use plugin install must a function")
  }

  tablePluginList.push(function helper() {
    fn.call(this, options)
  })
}

// 注册表格列类型
export function registerColumnType(columnTypeName, handler, options) {
  if (!handler && !isFunction(handler)) {
    throw new Error("register table column type must a function")
  }

  if (!columnTypeName) {
    throw new Error("table column type name is required")
  }
  columnTypeList[columnTypeName] = handler(options)
}

// 枚举类型
export function pdTableEnumColumnTypePlugin(options) {
  function enumType(row, column) {
    let result = this.nullValueDefault
    const { prop, enumList } = column
    const { getDomClassName } = options
    const value = formatRowDataByKey(prop, row)

    if (isArray(enumList)) {
      const existingEnumItem = enumList.find((item) => item.value === value)
      const enumValue = existingEnumItem ? existingEnumItem.value : null
      const enumLabel = existingEnumItem ? existingEnumItem.label : null
      if (getDomClassName && enumValue) {
        const className = getDomClassName(existingEnumItem.value)
        if (className) {
          result = h("span", { class: [className] }, enumLabel)
        } else {
          result = enumLabel
        }
      } else {
        result = enumLabel || result
      }
    }

    return result
  }
  return enumType
}

// 枚举类型 处理方法
export function handleColumnTypeByEnum(row, column, value) {
  let result = this.nullValueDefault
  const { enum: enumOption } = column

  let enumList = []
  switch (true) {
    case isString(enumOption):
      enumList = this.selectOptionMap[enumOption]
      break
    case isArray(enumOption):
      enumList = enumOption
      break
    case isRef(enumOption):
      enumList = enumOption.value
      break
    case isObject(enumOption):
      enumList = enumOption.options
      break
    default:
      break
  }

  enumList = enumList || []

  if (isRef(enumList)) {
    enumList = enumList.value
  }

  if (isArray(enumList)) {
    const existingEnumItem = enumList.find((item) => item.value === value)
    const enumLabel = existingEnumItem ? existingEnumItem.label : null
    result = enumLabel || result
    // 展示label 跟 value
    if (isObject(enumOption)) {
      const { showValue, getAttrs, ...rest } = enumOption
      const children = [h("div", result)]
      let attrs = {}
      if (showValue) {
        children.push(h("div", value || this.nullValueDefault))
      }
      if (getAttrs && isFunction(getAttrs)) {
        attrs = getAttrs(row) || attrs
      }

      result = h("div", { rest, ...attrs }, children)
    }
  } else if (isObject(enumList)) {
    result = enumList[value]
  }

  return result
}

// element native column type
export const nativeColumnType = ["selection", "index", "expand"]

// decide native column type
export const isNativeColumnType = (type) => nativeColumnType.includes(type)
