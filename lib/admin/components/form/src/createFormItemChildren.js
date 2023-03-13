import { isRef, h, resolveComponent } from 'vue';
import { isString, isFunction, isObject } from '@/utils';
import { formItemContentDescStyle } from './style';

/**
 * 根据配置项创建 form item 下的表单组件
 * @param {object} item form item config
 * @returns {object} vnode
 */
export function createFormItemChildren(config) {
  let { options, slot, inputAttrs, placeholder, component, label, prop, inputChildrenComponent } =
    config;

  // 全局注册的 element 组件
  const ElOption = resolveComponent('ElOption');
  const ElInput = resolveComponent('ElInput');
  const ElSelect = resolveComponent('ElSelect');

  if (slot) {
    return getChildrenBySlot.call(this, slot);
  }

  // 如果是 select
  let children = '';
  if (options) {
    const childrenOptions = isRef(options) ? options.value : options;

    children = childrenOptions.map((option) =>
      h(inputChildrenComponent ? inputChildrenComponent : ElOption, {
        value: option.value,
        label: option.label,
        key: option.value,
      }),
    );
  }

  let inputComponent;
  // 如果 component 是一个字符串
  if (isString(component)) {
    switch (component) {
      case 'input':
        inputComponent = ElInput;
        !placeholder && (placeholder = '请输入' + label);
        break;
      case 'select':
        inputComponent = ElSelect;
        inputAttrs = { style: { width: '100%' }, ...inputAttrs };
        break;
      default:
        inputComponent = resolveComponent(component);
    }
  } else {
    inputComponent = component;
  }
  if (!inputComponent) return '';

  const inputNode = h(
    inputComponent,
    {
      ...this.defaultInputAttrs,
      modelValue: this.modelValue[prop],
      placeholder,
      disabled: this.disabled,
      ...inputAttrs,
      'onUpdate:modelValue': (val) => {
        const formData = { ...this.modelValue };
        formData[prop] = val;
        this.$emit('update:modelValue', formData);
      },
    },
    () => children,
  );
  const contentDesc = createFormItemContentDesc.call(this, config);
  return {
    default: () => [inputNode, contentDesc],
  };
}

/**
 *  根据插槽名获取插槽
 *  @param {string} 插槽名称
 *  @returns {object} vnode
 */
function getChildrenBySlot(slotName) {
  const slot = this.$slots[slotName];
  if (slot) {
    return {
      default: () => slot(),
    };
  }
  return '';
}

/**
 * 创建 form item 介绍文字
 * @param {object} config form item config
 * @returns {object} vnode
 */
function createFormItemContentDesc({ desc }) {
  let result,
    className = [],
    style = {};
  // eslint-disable-next-line default-case
  switch (true) {
    case isString(desc):
      result = desc;
      break;
    case isFunction(desc):
      result = desc(this.modelValue);
      break;
    case isObject(desc):
      result = desc.content;
      className = desc.class || className;
      style = desc.style || style;
      break;
  }

  if (result) {
    result = h(
      'div',
      {
        class: ['form-item-content__desc', ...className],
        style: { ...formItemContentDescStyle, ...style },
      },
      result,
    );
  }

  return result;
}
