import { h, resolveComponent } from "vue"
import { createTableColumn } from "./table.create"
import { tableProps, globalTableDefaultProps } from "./table-props"

export default {
  name: "PdTable",
  props: {
    ...tableProps,
  },
  data() {
    return {}
  },
  components: {},
  methods: {},
  mounted() {},
  render() {
    // 合并默认配置
    const { commonColumnOptions, columns } = this.$props

    const ElTable = resolveComponent("ElTable")

    if (!ElTable) {
      throw new Error("ElTable must register global component")
    }

    return h(
      ElTable,
      {
        ...globalTableDefaultProps,
        ...this.$attrs,
      },
      () => createTableColumn.call(this, columns, commonColumnOptions)
    )
  },
}
