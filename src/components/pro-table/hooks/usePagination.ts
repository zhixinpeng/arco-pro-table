import { computed, ComputedRef, ref, unref, watch } from 'vue'

import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'

import { isBoolean } from '../../shared/is'
import { ProTableProps } from '../types'

export function usePagination(refProps: ComputedRef<ProTableProps>) {
  const configRef = ref<PaginationProps>({})
  const show = ref(true)

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {}),
        }
      }
    },
  )

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps)

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false
    }

    return {
      current: 1,
      pageSize: 20,
      defaultPageSize: 20,
      showTotal: true,
      showPageSize: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
    }
  })

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo)
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    }
  }

  function getPagination() {
    return unref(getPaginationInfo)
  }

  function getShowPagination() {
    return unref(show)
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag
  }

  return {
    getPagination,
    getPaginationInfo,
    setShowPagination,
    getShowPagination,
    setPagination,
  }
}
