import { h } from "vue"
import { ElImage } from "element-plus"
import { columnTypeList } from "../column-type"
import { isExternal } from "@/utils"
import { getProxyConfig } from "~/settings"

const imageStyle = {
  width: "60px",
  height: "60px",
}

const defaultProps = {
  "hide-on-click-modal": true,
  "preview-teleported": true,
  fit: "contain",
}

export function genImageType({ value, column }) {
  // if (!isExternal(value) && process.env.NODE_ENV == "development" && value) {
  //   value = getProxyConfig().target + value
  // }
  const { config = {} } = column
  return h(ElImage, { src: value, previewSrcList: [value], style: imageStyle, ...defaultProps, ...config })
}

columnTypeList["image"] = genImageType
