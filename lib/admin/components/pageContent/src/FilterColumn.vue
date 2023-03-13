<!-- <template>
  <div class="filter-column" :class="[filterColumnPosition]">
    <el-popover placement="left" width="200" trigger="click">
      <el-button type="text" slot="reference"
        ><i class="el-icon-setting icon-setting"></i
      ></el-button>
      <el-checkbox-group v-model="filterColumns">
        <div v-for="item in columns" :key="item.label">
          <el-checkbox v-if="item.label" :label="item.label"></el-checkbox>
        </div>
      </el-checkbox-group>
    </el-popover>
  </div>
</template> -->

<script>
import { h, resolveComponent } from "vue"
import { Setting } from "@element-plus/icons-vue"

export default {
  name: "FilterColumn",
  data() {
    return {
      selectList: [],
    }
  },
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    showColumnList: {
      type: Array,
      default: () => [],
    },
    filterColumnPosition: {
      type: String,
      default: "right",
    },
  },
  methods: {},
  mounted() {},
  computed: {
    filterColumns: {
      get() {
        return this.showColumnList
      },
      set(val) {
        this.$emit("update:showColumnList", val)
      },
    },
  },
  render() {
    const wrapper = (children) => h("div", { class: ["filter-column", this.filterColumnPosition] }, children)

    const ElPopover = resolveComponent("ElPopover")
    const ElButton = resolveComponent("ElButton")
    const ElCheckboxGroup = resolveComponent("ElCheckboxGroup")
    const ElCheckbox = resolveComponent("ElCheckbox")

    const triggerEl = () => h(ElButton, { type: "text" }, h(Setting, { style: "1.5em", height: "1.5em" }))

    const popoverContent = () =>
      h(
        ElCheckboxGroup,
        {
          modelValue: this.filterColumns,
          "onUpdate:modelValue": (value) => {
            this.filterColumns = value
          },
        },
        checkboxList()
      )

    const checkboxList = () =>
      this.columns.filter((item) => item.label).map((item) => h("div", { key: item.label }, h(ElCheckbox, { label: item.label })))

    const children = () => h(ElPopover, { placement: "left", width: 200, trigger: "click" }, { reference: triggerEl, default: popoverContent })
    return wrapper(children())
  },
}
</script>

<style scoped lang="scss">
.filter-column {
  float: right;
  top: 0;

  &.left {
    left: 0;
  }
  &.center {
    left: 50%;
    transform: translateX(-50%);
  }
  &.right {
    right: 0;
  }

  .icon-setting {
    font-size: 18px;
  }
}
</style>
