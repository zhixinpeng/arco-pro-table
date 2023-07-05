import type { Size } from '@arco-design/web-vue'
import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'

import { ProColumnData, ProTableProps } from '.'

/** 表格方法 */
export interface ProTableAction {
  /**
   * 设置全选状态
   * @param { boolean } checked
   */
  selectAll: (checked?: boolean) => void

  /**
   * 设置行选择器状态
   * @param { string | number | (string | number)[] } rowKey
   * @param { boolean } checked
   */
  select: (rowKey: string | number | (string | number)[], checked?: boolean) => void

  /**
   * 设置全部展开状态
   * @param { boolean } checked
   */
  expandAll: (checked?: boolean) => void

  /**
   * 设置展开状态
   * @param { string | number | (string | number)[] } rowKey
   * @param { boolean } checked
   */
  expand: (rowKey: string | number | (string | number)[], checked?: boolean) => void

  /**
   * 重置列的筛选器
   * @param { string | string[] } dataIndex
   */
  resetFilters: (dataIndex?: string | string[]) => void

  /**
   * 清空列的筛选器
   * @param { string | string[] } dataIndex
   */
  clearFilters: (dataIndex?: string | string[]) => void

  /**
   * 重置列的排序
   */
  resetSorters: () => void

  /**
   * 清空列的排序
   */
  clearSorters: () => void

  /**
   * 刷新表格
   * @param { boolean } force 是否强制刷新（返回第一页）
   */
  reload: (force?: boolean) => Promise<void>

  /**
   * 设置表格属性
   * @param props
   */
  setProps: (props: Partial<ProTableProps>) => void

  /**
   * 获取表格尺寸
   */
  getSize: () => Size

  /**
   * 获取表格列表数据
   */
  getColumns: () => ProColumnData[]

  /**
   * 设置表格列表数据
   */
  setColumns: (columns: ProColumnData[] | string[]) => void

  /**
   * 获取缓存表格列表数据
   */
  getCacheColumns: () => ProColumnData[]

  /**
   * 获取分页器数据
   */
  getPagination: () => PaginationProps | boolean

  /**
   * 设置分页器数据
   * @param props 分页器属性
   */
  setPagination: (props: Partial<PaginationProps>) => void

  /**
   * 设置分页器是否显示
   * @param show 是否显示分页器
   */
  setShowPagination: (show: boolean) => Promise<void>

  /**
   * 获取分页器的显示状态
   */
  getShowPagination: () => boolean
}
