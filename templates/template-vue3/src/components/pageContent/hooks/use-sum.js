import { isRef } from "vue"
import { isFunction } from "@/utils"

const handleFooterSummaryRow = ({ column, data }) => {
  const { footerComputed = {} } = column

  switch (footerComputed.type) {
    // 平均值
    case "average":
      return handleFooterSummaryRowByAverage({ column, data })
    // 求和
    case "sum":
      return handleFooterSummaryRowBySum({ column, data })

    default:
      return "-"
  }
}

// 相加
const handleFooterSummaryRowBySum = ({ column, data }) => {
  const { footerComputed, toFixed, valueFormatter } = column
  let result = 0
  const values = data.map((item) => {
    const { formatter } = footerComputed
    if (formatter && isFunction(formatter)) {
      return formatter(item, column.prop, column)
    }

    return Number(item[column.prop])
  })

  if (!values.every((value) => Number.isNaN(value))) {
    result = values.reduce((prev, curr) => {
      const value = Number(curr)
      if (!Number.isNaN(value)) {
        return prev + curr
      } else {
        return prev
      }
    }, 0)
  }

  if (!Number.isNaN(result) && toFixed) {
    result = result.toFixed(toFixed)
  }

  if (valueFormatter && isFunction(valueFormatter)) {
    result = valueFormatter(values, result, data, column)
  }

  return result
}

// 平均
const handleFooterSummaryRowByAverage = ({ column, data }) => {
  const { footerComputed } = column
  const { removeZero, toFixed, formatter, valueFormatter } = footerComputed

  let result = 0,
    sum = 0,
    length = 1
  const values = data.map((item) => {
    if (formatter && isFunction(formatter)) {
      return formatter(item, column.prop, column)
    }
    return Number(item[column.prop])
  })

  if (!values.every((value) => Number.isNaN(value))) {
    sum = values.reduce((prev, curr) => {
      const value = Number(curr)
      if (!Number.isNaN(value)) {
        return prev + curr
      } else {
        return prev
      }
    }, 0)
  }

  if (removeZero) {
    length = values.filter((item) => item > 0).length
  } else {
    length = values.filter((item) => item >= 0).length
  }

  if (valueFormatter && isFunction(valueFormatter)) {
    result = valueFormatter(values, result, data, column)
  } else {
    result = sum / length
  }

  if (!Number.isNaN(result) && toFixed) {
    result = result.toFixed(toFixed)
  }

  return result
}

export const useTableSum = ({ columns }) => {
  const getSummaries = (param) => {
    columns = isRef(columns) ? columns.value : columns

    const { data } = param
    const sums = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = "合计"
        return
      }
      sums[index] = handleFooterSummaryRow({ column, data })
    })

    return sums
  }

  return { getSummaries }
}
