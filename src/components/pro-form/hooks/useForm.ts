import { FieldData } from '@arco-design/web-vue/es/form/interface'
import { ref, unref } from 'vue'
import { ProFormAction } from '../types'

export function useForm() {
  const formRef = ref<ProFormAction | null>(null)

  const getFormInstance = () => {
    const form = unref(formRef)
    if (!form) {
      throw new Error('表单组件还未渲染，请确保在渲染之后再获取表单方法!')
    }
    return form as ProFormAction
  }

  const methods: ProFormAction = {
    resetFields(field?: string | string[]): void {
      getFormInstance().resetFields(field)
    },

    setFields(data: Record<string, FieldData>): void {
      getFormInstance().setFields(data)
    },
  }

  return {
    formRef,
    methods,
  }
}
