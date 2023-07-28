import { isFunction } from 'lodash'
import { computed, ComputedRef, Ref, unref } from 'vue'

import { ProFormProps } from '../../ProForm'
import { ProTableProps } from '../types'

export function useTableForm(
  propsRef: ComputedRef<ProTableProps>,
  fetchData: (init?: boolean) => Promise<void>,
  emit: (event: any, ...args: any[]) => void,
  formInfo: Ref<Record<string, any>>,
) {
  const getFormProps = computed((): Partial<ProFormProps> => {
    const { formConfig, title } = unref(propsRef)
    return {
      title,
      ...formConfig,
    }
  })

  const handleFormSubmit = (info: Record<string, any>) => {
    const { beforeSearch } = unref(propsRef)
    if (beforeSearch && isFunction(beforeSearch)) {
      info = beforeSearch(info) || info
    }
    formInfo.value = info
    fetchData()
  }

  const handleFormReset = () => {
    emit('reset')
  }

  formInfo.value = unref(propsRef).formConfig?.initFormModel || {}

  return {
    getFormProps,
    handleFormSubmit,
    handleFormReset,
  }
}
