import { h, resolveComponent, isRef } from "vue"
import { isString, isObject, getSelectOptions, handleResolveComponent } from "@/utils"

// 创建 search form
export function searchFormRender() {
  const children = []
  const title = this.$slots.title
  if (title) {
    children.push(title())
  }

  children.push(
    h(
      "div",
      {
        class: `pd-search__wrapper ${this.flexWrap ? "flex-wrap" : ""}`,
        style: this.formStyle,
      },
      createFormItems.call(this)
    )
  )
  return children
}

// crate search form items
function createFormItems() {
  const children = []
  const beforeSlot = this.$slots.before
  const afterSlot = this.$slots.after
  if (beforeSlot) {
    children.push(h("div", { class: ["pd-search-item"], style: this.formItemStyle }, beforeSlot()))
  }

  this.formItems.forEach((item) => {
    children.push(
      h(
        "div",
        {
          class: ["pd-search-item"],
          style: this.formItemStyle,
          key: item.prop,
        },
        createFormItemChildren.call(this, item)
      )
    )
  })

  if (afterSlot) {
    children.push(
      h(
        "div",
        {
          class: [
            "pd-search-item",
            "pd-search__after",
            {
              start: this.searchBtnPosition === "start",
              end: this.searchBtnPosition === "end",
            },
          ],
          style: this.formItemStyle,
        },
        afterSlot()
      )
    )
  }

  return children
}

// create search form item
function createFormItemChildren(option) {
  const children = []
  const { label = "", labelSlotName, labelStyle } = option
  let { labelClass = [] } = option

  if (isString(labelClass)) {
    labelClass = [labelClass]
  }

  if (option.label) {
    const labelSlot = this.$slots[labelSlotName]
    children.push(
      h(
        "div",

        {
          class: ["pd-search-item__label", ...labelClass],
          style: { ...labelStyle },
        },
        labelSlot
          ? labelSlot()
          : [
              h("span", label),
              this.labelSuffix
                ? h("span", { class: "label-suffix" }, this.labelSuffix)
                : h("span", {
                    class: "label-suffix",
                    style: { margin: "0 .2em" },
                  }),
            ]
      )
    )
  }

  children.push(h("div", { class: "pd-search-item__content" }, createFormItemContentChildren.call(this, option)))
  return children
}

function createFormItemContentChildren(item) {
  const { ElSelect, ElOption, ElInput, ElDatePicker } = handleResolveComponent(["ElSelect", "ElOption", "ElInput", "ElDatePicker"])

  let { label, prop, labelSlotName, component, options, slotName, labelStyle, labelClass, ...rest } = item

  if (slotName) {
    const contentSlot = this.$slots[slotName]
    if (contentSlot) {
      return contentSlot()
    }
  }

  let inputComponent,
    inputChildren = [],
    defaultPlaceholder = ""
  if (isString(component)) {
    switch (component) {
      case "select":
        inputComponent = resolveComponent("el-select")
        inputComponent = inputComponent ? inputComponent : ElSelect
        if (options) {
          inputChildren = (isRef(options) ? options.value : options).map((option) => h(ElOption, { value: option.value, label: option.label }))
        }
        defaultPlaceholder = `请选择${label}`
        break
      case "input":
        inputComponent = resolveComponent("el-input")
        inputComponent = inputComponent ? inputComponent : ElInput
        defaultPlaceholder = `请输入${label}`
        break
      case "date":
        inputComponent = resolveComponent("el-date-picker")
        inputComponent = inputComponent ? inputComponent : ElDatePicker
        defaultPlaceholder = `请选择${label}`
        rest = {
          format: "YYYY-MM-DD HH:mm:ss",
          valueFormat: "YYYY-MM-DD HH:mm:ss",
          ...rest,
        }
        break
      default:
        inputComponent = resolveComponent(component)
        break
    }
  } else if (isObject(component)) {
    inputComponent = component
  } else {
    throw new Error("option component must a component or string")
  }

  const commonProps = { ...this.commonProps }

  // 样式
  let style = { width: "100%" }
  if (commonProps.style) {
    style = { ...style, ...commonProps.style }
    delete commonProps.style
  }
  if (rest.style) {
    style = { ...style, ...rest.style }
    delete rest.style
  }

  // 类名
  let classList = [this.inputClass]
  if (commonProps.class) {
    classList = { ...classList, ...commonProps.class }
    delete commonProps.class
  }
  if (rest.class) {
    classList = { ...classList, ...rest.class }
    delete rest.class
  }

  return h(
    inputComponent,
    {
      placeholder: defaultPlaceholder,
      style,
      class: classList,
      size: this.size,
      ...commonProps,
      ...rest,
      modelValue: this.modelValue[prop],
      "onUpdate:modelValue": (value) => {
        const formData = { ...this.modelValue }
        formData[prop] = value
        this.$emit("update:modelValue", formData)
      },
    },
    () => inputChildren
  )
}

export default {}
