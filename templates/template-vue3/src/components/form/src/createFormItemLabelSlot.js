import { h, resolveComponent } from "vue";
import { isString, isObject, isFunction } from "@/utils";

/**
 * 创建 form item label
 * @param {object} config form item 配置
 * @param {object} slots 组件插槽对象
 * @returns {object} vnode
 */
export function createFormItemLabelSlot(config) {
  const { renderLabel, label } = config;
  // 如果有 form label 渲染函数
  if (renderLabel && isFunction(renderLabel)) {
    return {
      label: (props) => renderLabel(props),
    };
  } else if (renderLabel && isString(renderLabel)) {
    const slot = this.slots[renderLabel];
    if (slot) {
      return {
        label: () => slot(),
      };
    }
  }

  const tooltips = createLabelTooltip(item);
  return {
    label: () => h("span", { style: formLabelStyle }, [label, tooltips]),
  };
}

/**
 * 创建 form item label tip
 * @param {object} config form item 配置
 * @returns {object} vnode
 */
function createLabelTooltip({ labelTooltip }) {
  const ElTooltip = resolveComponent(ElTooltip);

  let result;
  // eslint-disable-next-line default-case
  switch (true) {
    case isString(labelTooltip):
      result = h(
        ElTooltip,
        { effect: "light", placement: "top", content: labelTooltip },
        h(QuestionFilled, { style: { width: "1em", marginLeft: "8px" } })
      );
      break;
    case isObject(labelTooltip):
      result = h(ElTooltip, { ...labelTooltip }, QuestionFilled);
      break;
    case isFunction(labelTooltip):
      const content = labelTooltip(this.modelValue);
      result = h(
        ElTooltip,
        { effect: "light", placement: "top", content },
        h(QuestionFilled, { style: { width: "1em", marginLeft: "8px" } })
      );
      break;
  }

  return result;
}
