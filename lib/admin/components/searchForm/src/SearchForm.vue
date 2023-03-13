<script>
import { h } from "vue"
import { searchFormRender } from "./create"
import defaultProps from "./default-props"

export default {
  name: "PdSearchForm",
  props: { ...defaultProps },
  computed: {
    formStyle() {
      if (this.gutter > 0) {
        const gutter = Math.floor(window.parseFloat(this.gutter) / 2)
        return {
          marginLeft: `${-gutter}px`,
          marginRight: `${-gutter}px`,
        }
      }
      return {}
    },
    formItemStyle() {
      if (this.gutter > 0) {
        const gutter = Math.floor(window.parseFloat(this.gutter) / 2)

        return {
          paddingLeft: `${gutter}px`,
          paddingRight: `${gutter}px`,
        }
      }

      return {}
    },
  },
  render() {
    return h(
      "div",
      {
        class: "pd-search",
      },
      searchFormRender.call(this)
    )
  },
}
</script>

<style lang="scss">
.pd-search {
  // overflow: hidden;

  &__wrapper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    &.flex-wrap {
      flex-wrap: wrap;

      .pd-search-item {
        margin-bottom: 10px;
      }
    }
  }

  &-item {
    display: flex;
    align-items: center;

    &__label {
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
    }
  }

  .label-suffix {
    white-space: pre;
    margin: 0 5px;
  }

  .pd-search__after {
    flex: 1;

    &.start {
      justify-content: flex-start;
    }
    &.end {
      justify-content: flex-end;
    }
  }
}
</style>
