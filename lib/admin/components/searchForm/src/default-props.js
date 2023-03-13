export default {
  modelValue: {
    type: Object,
    default() {
      return {}
    },
  },
  // form items
  formItems: {
    type: Array,
    default() {
      return []
    },
  },
  gutter: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
    default: "small",
  },
  inputClass: {
    type: String,
    default: "",
  },
  labelSuffix: {
    type: String,
    default: "",
  },
  flexWrap: {
    type: Boolean,
    default: false,
  },
  selectOptionMap: {
    type: Object,
    default() {
      return {}
    },
  },
  commonProps: {
    type: Object,
    default() {
      return {
        clearable: true,
      }
    },
  },
  searchBtnPosition: {
    type: String,
    default: "",
  },
}
