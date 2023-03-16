import type {
  TableColumnData,
  TableData,
  TableBorder,
  TableRowSelection,
  TableExpandable,
  TablePagePosition,
  TableOperationColumn,
  TableDraggable,
} from '@arco-design/web-vue/es/table/interface'
import { VirtualListProps } from '@arco-design/web-vue/es/_components/virtual-list-v2/interface'
import { Size } from '@arco-design/web-vue/es/_utils/constant'
import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'
import { ScrollbarProps } from '@arco-design/web-vue/es/scrollbar'

import { ProFormProps } from '../../pro-form'

/** 表格属性 */
export interface ProTableProps {
  /**
   * 表格数据请求方法
   */
  request: (params?: any) => Promise<{ data: any[]; total: number }>

  /**
   * 表格是否显示设置按钮
   */
  showSetting?: boolean

  /**
   * 表格列描述信息
   */
  columns: ProColumnData[]

  /**
   * 表单配置属性
   */
  formConfig?: Partial<ProFormProps>

  /**
   * 表单查询之前的处理
   */
  beforeSearch?: (...arg: any[]) => any

  /**
   * 标题
   */
  title?: string

  /**
   * 表格数据
   */
  data?: TableData[]

  /**
   * 是否显示边框
   */
  bordered?: boolean | TableBorder

  /**
   * 是否显示选中效果
   */
  hoverable?: boolean

  /**
   * 是否开启斑马纹效果
   */
  stripe?: boolean

  /**
   * 表格的大小
   * @values 'mini','small','medium','large'
   * @defaultValue 'large'
   */
  size?: Size

  /**
   * 表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。
   */
  tableLayoutFixed?: boolean

  /**
   * 是否为加载中状态
   */
  loading?: boolean | object

  /**
   * 表格的行选择器配置
   */
  rowSelection?: TableRowSelection

  /**
   * 表格的展开行配置
   */
  expandable?: TableExpandable

  /**
   * 表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。`2.20.0` 版本增加 `minWidth`,`maxHeight` 的支持。
   */
  scroll?: {
    x?: number | string
    y?: number | string
    minWidth?: number | string
    maxHeight?: number | string
  }

  /**
   * 分页的属性配置
   */
  pagination?: boolean | PaginationProps

  /**
   * 分页选择器的位置
   * @values 'tl','top',tr','bl','bottom','br'
   */
  pagePosition?: TablePagePosition

  /**
   * 树形表格的缩进距离
   */
  indentSize?: number

  /**
   * 表格行 `key` 的取值字段
   */
  rowKey?: string

  /**
   * 是否显示表头
   */
  showHeader?: boolean

  /**
   * 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
   */
  virtualListProps?: VirtualListProps

  /**
   * 单元格合并方法（索引从数据项开始计数）
   */
  spanMethod?: (data: {
    record: TableData
    column: TableColumnData | TableOperationColumn
    rowIndex: number
    columnIndex: number
  }) => { rowspan?: number; colspan?: number } | void

  /**
   * 是否让合并方法的索引包含所有
   */
  spanAll?: boolean

  /**
   * 数据懒加载函数，传入时开启懒加载功能
   */
  loadMore?: (record: TableData, done: (children?: TableData[]) => void) => void

  /**
   * 筛选图标是否左对齐
   */
  filterIconAlignLeft?: boolean

  /**
   * 是否在子树为空时隐藏展开按钮
   */
  hideExpandButtonOnEmpty?: boolean

  /**
   * 表格行元素的类名。`2.34.0` 版本增加函数值支持
   */
  rowClass?: string | any[] | Record<string, any> | ((record: TableData, rowIndex: number) => any)

  /**
   * 表格拖拽排序的配置
   */
  draggable?: TableDraggable

  /**
   * 是否允许调整列宽
   */
  columnResizable?: boolean

  /**
   * 显示表尾总结行
   */
  summary?: boolean | ((params: { columns: TableColumnData[]; data: TableData[] }) => TableData[])

  /**
   *  总结行的首列文字
   */
  summaryText?: string

  /**
   * 总结行的单元格合并方法
   */
  summarySpanMethod?: (data: {
    record: TableData
    column: TableColumnData | TableOperationColumn
    rowIndex: number
    columnIndex: number
  }) => { rowspan?: number; colspan?: number } | void

  /**
   * 已选择的行（受控模式）优先于 `rowSelection`
   */
  selectedKeys?: (string | number)[]

  /**
   * 默认已选择的行（非受控模式）优先于 `rowSelection`
   */
  defaultSelectedKeys?: (string | number)[]

  /**
   * 显示的展开行、子树（受控模式）优先于 `expandable`
   */
  expandedKeys?: (string | number)[]

  /**
   * 默认显示的展开行、子树（非受控模式）优先于 `expandable`
   */
  defaultExpandedKeys?: (string | number)[]

  /**
   * 是否默认展开所有的行
   */
  defaultExpandAllRows?: boolean

  /**
   * 是否开启表头吸顶
   */
  stickyHeader?: boolean | number

  /**
   * 是否开启虚拟滚动条
   */
  scrollbar?: boolean | ScrollbarProps
}

/** 表格列数据 */
export interface ProColumnData extends TableColumnData {
  /** 覆盖原始类型，更改为必填属性 */
  dataIndex: string
  /** 在列设置中是否默认隐藏 */
  defaultHidden?: boolean
}

export type ColumnChangeParam = {
  dataIndex: string
  visible: boolean
}

export interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

export type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null
