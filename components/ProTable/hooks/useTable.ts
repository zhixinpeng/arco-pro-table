import { ref, toRaw, unref } from 'vue'

import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'

import { ProTableAction } from '../types/action'
import { ProColumnData, ProTableProps } from '../types/index'

export function useTable() {
  const tableRef = ref<ProTableAction | null>(null)

  const getTableInstance = () => {
    const table = unref(tableRef)
    if (!table) {
      throw new Error('表格组件还未渲染，请确保在渲染之后再获取表格方法!')
    }
    return table as ProTableAction
  }

  const methods: ProTableAction = {
    selectAll: (checked) => {
      getTableInstance().selectAll(checked)
    },
    select: (rowKey, checked) => {
      getTableInstance().select(rowKey, checked)
    },
    expandAll: (checked) => {
      getTableInstance().expandAll(checked)
    },
    expand: (rowKey, checked) => {
      getTableInstance().expand(rowKey, checked)
    },
    resetFilters: (dataIndex) => {
      getTableInstance().resetFilters(dataIndex)
    },
    clearFilters: (dataIndex) => {
      getTableInstance().clearFilters(dataIndex)
    },
    resetSorters: () => {
      getTableInstance().resetSorters()
    },
    clearSorters: () => {
      getTableInstance().clearSorters()
    },
    reload: async (force) => {
      await getTableInstance().reload(force)
    },
    setProps: (props: Partial<ProTableProps>) => {
      getTableInstance().setProps(props)
    },
    getSize: () => {
      return toRaw(getTableInstance().getSize())
    },
    getColumns: () => {
      const columns = getTableInstance().getColumns() || []
      return toRaw(columns)
    },
    setColumns: (columns: ProColumnData[] | string[]) => {
      getTableInstance().setColumns(columns)
    },
    getCacheColumns: () => {
      return getTableInstance().getCacheColumns()
    },
    getPagination: () => {
      return getTableInstance().getPagination()
    },
    setPagination: (props: Partial<PaginationProps>) => {
      getTableInstance().setPagination(props)
    },
    setShowPagination: async (show: boolean) => {
      getTableInstance().setShowPagination(show)
    },
    getShowPagination: () => {
      return toRaw(getTableInstance().getShowPagination())
    },
  }

  return {
    tableRef,
    methods,
  }
}
