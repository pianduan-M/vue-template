import { h } from "vue";
import { createFormItems } from "./createFormItems";

// 分组内容样式
const groupContentStyle = {
  width: "90%",
  margin: "24px auto",
};

/**
 *  根据分组配置格将所有的 items 进行分组
 * @param {object} props
 * @returns {array}
 */
function formatterFormItemsByGroup(props) {
  const { formItems, group } = props;
  const filterItems = [];

  group.forEach(({ start, end }) => {
    filterItems.push(formItems.slice(start, end));
  });

  return filterItems;
}

/**
 * 创建分组标题
 * @param {object} groupItem
 * @returns {object} vnode
 */
function createGroupTitle(groupItem) {
  const { titleStyles = {}, titleClass = [], title } = groupItem;
  return h("div", { style: titleStyles, class: titleClass }, () =>
    h("span", {}, title)
  );
}

/**
 * 根据分组后的 formItems 创建 form vnode
 * @param {object} props  组件 props
 * @param {object} groupItem
 * @returns {object[]} vnode
 */
function createFormItemsContent(props, groupItem) {
  const { contentStyle = groupContentStyle, contentClass } = groupItem;
  return h(
    "div",
    { style: contentStyle, class: contentClass },
    createFormItems.call(this, props)
  );
}

// 创建分割线
function createGroupSplitLine(groupItem) {
  const { lineStyle, lineClass } = groupItem;
  return h("div", { style: lineStyle, class: lineClass });
}

/**
 * 根据分组配置创建 form 主要方法
 * @param {object} props 组件 props
 * @returns {object[]} vnode
 */
export function createFormItemsByGroup(props) {
  const { group } = props;
  const filterFormItems = formatterFormItemsByGroup(props);

  const result = [];

  filterFormItems.forEach((items, index) => {
    const groupProps = {
      ...props,
      formItems: items,
    };
    const groupItems = group[index];

    // title
    result.push(createGroupTitle(groupItems));

    // form items
    result.push(createFormItemsContent.call(this, groupProps, groupItems));

    // 分割线
    if (index < group.length - 1) {
      result.push(createGroupSplitLine(groupItems));
    }
  });

  return result;
}
