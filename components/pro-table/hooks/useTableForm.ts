import { isFunction } from 'lodash'
import { computed, ComputedRef, unref } from 'vue'

import { ProFormProps } from '../../pro-form'
import { ProTableProps } from '../types'

export function useTableForm(
  propsRef: ComputedRef<ProTableProps>,
  fetchData: (info?: Record<string, any>) => Promise<void>,
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
    fetchData(info)
  }

  return {
    getFormProps,
    handleFormSubmit,
  }
}
