import PdTable from "./src/table"
import { registerColumnType } from "./src/column-type"
import { setTableGlobalDefaultProps } from "./src/table-props"
import "./src/enumTypes"

PdTable.install = (app, options) => {
  if (options) {
    PdTable.data = () => ({ globleTableOptions: options })
  }
  app.component(PdTable.name, PdTable)
}

// 注册表格列类型方法
PdTable.registerColumnType = registerColumnType

// 设置全局 table props
PdTable.setTableGlobalDefaultProps = setTableGlobalDefaultProps

export default PdTable
