import { ref, watch } from "vue"
import { request } from "@/utils/http"
import { debounce } from "throttle-debounce"
import { isFunction, writeFileAsync } from "@/utils"

export const useRequest = ({ props, _queryParams, getQueryParams }) => {
  let requestCounter = 0

  // 表格数据
  const tableData = shallowRef([])
  let loading = ref(false)

  const getTableData = async (params) => {
    tableData.value = []
    requestCounter++
    const _requestCounter = requestCounter
    loading.value = true
    if (!props.url.list) {
      // throw new Error("需要提供请求路径")
      return console.log("需要提供请求路径")
    }

    try {
      const res = await request({ url: props.url.list, method: "GET", params })

      if (_requestCounter !== requestCounter) return

      let resultData
      if (res.result) {
        const data = res.result
        resultData = data.items || []
        _queryParams.value.total = data.total

        return
      }

      resultData = (res.data.rows ? res.data.rows : res.data) || []
      _queryParams.value.total = res.data.total

      if (props.resultFormatter && isFunction(props.resultFormatter)) {
        resultData = props.resultFormatter(resultData)
      }

      tableData.value = resultData
    } catch (error) {
      console.log(error, "error")
      tableData.value = []
    } finally {
      loading.value = false
    }
  }

  // 自动搜索
  function helper() {
    getTableData(getQueryParams())
  }
  if (props.autoSearch) {
    watch(_queryParams, debounce(500, helper))
  }

  // if (Object.keys(props.queryParams).length) {
  //   watch(props.queryParams, debounce(200, helper))
  // }

  const onExportClick = async (params) => {
    if (!props.exportUrl) return
    const loading = $loading({
      text: "下载中。。。",
    })
    try {
      const filename = "littleofExport.xlsx"
      const { data } = await request({
        url: props.exportUrl,
        params: {
          ...getQueryParams(),
          ...params,
        },
        responseType: "blob",
      })
      writeFileAsync(data, filename)
      $message.success("导出成功")
    } catch (error) {
      console.log(error, "error")
      $message.error("导出失败")
    } finally {
      loading?.close()
    }
  }

  return { tableData, getTableData, onExportClick, loading }
}
