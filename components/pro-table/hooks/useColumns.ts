import { cloneDeep, isArray, isEqual, isString } from 'lodash'
import { computed, ComputedRef, ref, Ref, toRaw, unref, watch } from 'vue'

import { ProColumnData, ProTableProps } from '../types'

export function useColumns(propsRef: ComputedRef<ProTableProps>) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<ProColumnData[]>
  let cacheColumns = unref(propsRef).columns

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns
      cacheColumns = columns ?? []
    },
  )

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef))

    if (!columns) return []

    return columns
  })

  function setColumns(columnList: Partial<ProColumnData>[] | (string | string[])[]) {
    const columns = cloneDeep(columnList)
    if (!isArray(columns)) return

    if (columns.length <= 0) {
      columnsRef.value = []
      return
    }

    const firstColumn = columns[0]
    const cacheKeys = cacheColumns.map((item) => item.dataIndex)

    if (!isString(firstColumn) && !isArray(firstColumn)) {
      columnsRef.value = columns as ProColumnData[]
    } else {
      const columnKeys = (columns as (string | string[])[]).map((m) => m.toString())

      const newColumns: ProColumnData[] = []
      cacheColumns.forEach((item) => {
        newColumns.push({
          ...item,
          defaultHidden: !columnKeys.includes(item.dataIndex?.toString() as string),
        })
      })

      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            columnKeys.indexOf(prev.dataIndex?.toString() as string) -
            columnKeys.indexOf(next.dataIndex?.toString() as string)
          )
        })
      }

      columnsRef.value = newColumns
    }
  }

  function getColumns() {
    return toRaw(unref(getColumnsRef))
  }

  function getCacheColumns() {
    return cacheColumns
  }

  const getViewColumns = computed(() => {
    const viewColumns = unref(getColumnsRef).filter((item) => !item.defaultHidden)

    const columns = cloneDeep(viewColumns)
    return columns
  })

  return {
    getColumnsRef,
    getCacheColumns,
    getColumns,
    setColumns,
    getViewColumns,
  }
}
