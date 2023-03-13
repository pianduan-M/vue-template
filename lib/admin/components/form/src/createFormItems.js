import { h, resolveComponent } from 'vue';
import { isFunction, buildShortUUID } from '@/utils';
import { createFormItemLabelSlot } from './createFormItemLabelSlot';
import { createFormItemChildren } from './createFormItemChildren';

/**
 * 创建 form 列
 * @param {object} props 组件 props
 * @returns {object} vnode
 */
export function createFormItems(props) {
  const ElRow = resolveComponent('ElRow');

  const filterFormItems = filterHiddenFormItems(props);

  return h(
    ElRow,
    {
      ...props.rowAttrs,
    },
    () => filterFormItems.map((item) => createFormItemByConfig.call(this, item, props)),
  );
}

// 过滤隐藏列
function filterHiddenFormItems({ formItems, modelValue }) {
  return formItems.filter((item) => {
    const isHidden = item.isHidden;

    if (isFunction(isHidden)) {
      return !isHidden(modelValue);
    } else {
      return !isHidden;
    }
  });
}

// 根据配置创建每一列
function createFormItemByConfig(config, props) {
  const colLayout = { ...props.colLayout };

  const {
    layout,
    component,
    options,
    renderLabel,
    isHidden,
    slot,
    inputAttrs,
    placeholder,
    inputChildrenComponent,
    labelTooltip,
    ...formItemProps
  } = config;

  const itemLayout = layout ? layout : colLayout;

  const ElCol = resolveComponent('ElCol');
  const ElFormItem = resolveComponent('ElFormItem');

  return h(
    ElCol,
    {
      ...itemLayout,
      key: config.label || config.prop || buildShortUUID(),
    },
    () =>
      h(
        ElFormItem,
        {
          ...props.defaultFormItemProps,
          ...formItemProps,
          key: config.prop || buildShortUUID(),
        },
        {
          ...createFormItemLabelSlot.call(this, config),
          ...createFormItemChildren.call(this, config),
        },
      ),
  );
}
