<script>
  import { resolveComponent } from 'vue';
  import { pdFormProps } from './PdForm.js';
  import { createFormItemsByGroup } from './createGroup';
  import { createFormItems } from './createFormItems';
  import { isArray } from '@/utils';

  export default {
    name: 'PdForm',
    emit: ['update:modelValue'],
    props: { ...pdFormProps },
    setup(props) {
      const formRef = ref();
      const validate = () => formRef.value?.validate();
      const validateField = (props) => formRef.value?.validateField(props);
      const scrollToField = (props) => formRef.value?.scrollToField(props);
      const resetFields = (props) => formRef.value?.resetFields(props);
      const clearValidate = (props) => formRef.value?.clearValidate(props);

      // 祖先节点 提供一个 dialog 开关标识
      try {
        const dialogVisible = inject('dialogVisible');
        if (dialogVisible) {
          watch(dialogVisible, (newVal) => {
            if (!newVal && props.autoClearValidate) {
              clearValidate();
            }
          });
        }
      } catch (error) {
        console.log(error);
      }

      return {
        formRef,
        validate,
        validateField,
        scrollToField,
        resetFields,
        clearValidate,
      };
    },
    render() {
      let formChildren;
      // 判断是否有分组配置
      if (this.group && isArray(this.group)) {
        formChildren = createFormItemsByGroup.call(this, this.$props);
      } else {
        formChildren = createFormItems.call(this, this.$props);
      }

      const ElForm = resolveComponent('ElForm');
      return h(
        ElForm,
        {
          model: this.modelValue,
          labelWidth: 'auto',
          ...this.$attrs,
          ref: 'formRef',
        },
        () => formChildren,
      );
    },
  };
</script>

<style scoped lang="scss">
  .pd-form__line {
    margin: 24px 0;
    border-bottom: 1px solid #e8e8e8;
  }
</style>
