import { ref } from "vue"

export function useForm(initFormData) {
  const formData = ref(JSON.parse(JSON.stringify(initFormData)))
  const pdFormRef = ref()

  const validate = () => pdFormRef.value?.validate()
  const validateField = (props) => {
    pdFormRef.value?.validateField(props)
  }
  const scrollToField = (props) => {
    pdFormRef.value?.scrollToField(props)
  }

  const resetFields = (props) => {
    pdFormRef.value?.resetFields(props)
  }
  const clearValidate = () => {
    pdFormRef.value?.clearValidate()
    formData.value = JSON.parse(JSON.stringify(initFormData))
  }

  return {
    formData,
    formRef: pdFormRef,
    validate,
    validateField,
    scrollToField,
    clearValidate,
    resetFields,
  }
}

export default {}
