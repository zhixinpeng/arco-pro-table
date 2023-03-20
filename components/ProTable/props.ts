import { PropType } from 'vue'

import { VirtualListProps } from '@arco-design/web-vue/es/_components/virtual-list-v2/interface'
import {
  TableBorder,
  TableChangeExtra,
  TableComponents,
  TableData,
  TableDraggable,
  TableExpandable,
  TableOperationColumn,
  TablePagePosition,
  TableRowSelection,
} from '@arco-design/web-vue/es/table/interface'

import { ProFormProps } from '../ProForm/types'
import { ProColumnData } from './types'
import { Size } from '@arco-design/web-vue/es/_utils/constant'
import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'
import { ScrollbarProps } from '@arco-design/web-vue/es/scrollbar/interface'

export const baseProps = {
  request: {
    type: Function as PropType<(params?: any) => Promise<{ data: any[]; total: number }>>,
    default: null,
  },
  showSetting: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Array as PropType<ProColumnData[]>,
    default: [],
  },
  formConfig: {
    type: Object as PropType<Partial<ProFormProps>>,
    default: null,
  },
  beforeSearch: {
    type: Function as PropType<(...arg: any[]) => any>,
    default: null,
  },
  title: {
    type: String,
    default: '',
  },
  /**
   * @zh 表格的数据
   * @en Table data
   */
  data: {
    type: Array as PropType<TableData[]>,
    default: () => [],
  },
  /**
   * @zh 是否显示边框
   * @en Whether to show the border
   */
  bordered: {
    type: [Boolean, Object] as PropType<boolean | TableBorder>,
    default: true,
  },
  /**
   * @zh 是否显示选中效果
   * @en Whether to show the hover effect
   */
  hoverable: {
    type: Boolean,
    default: true,
  },
  /**
   * @zh 是否开启斑马纹效果
   * @en Whether to enable the stripe effect
   */
  stripe: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 表格的大小
   * @en The size of the table
   * @values 'mini','small','medium','large'
   * @defaultValue 'large'
   */
  size: {
    type: String as PropType<Size>,
    default: 'large',
  },
  /**
   * @zh 表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。
   * @en The table-layout property of the table is set to fixed. After it is set to fixed, the width of the table will not be stretched beyond 100% by the content.
   */
  tableLayoutFixed: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否为加载中状态
   * @en Whether it is loading state
   */
  loading: {
    type: [Boolean, Object],
    default: false,
  },
  /**
   * @zh 表格的行选择器配置
   * @en Table row selector configuration
   */
  rowSelection: {
    type: Object as PropType<TableRowSelection>,
  },
  /**
   * @zh 表格的展开行配置
   * @en Expand row configuration of the table
   */
  expandable: {
    type: Object as PropType<TableExpandable>,
  },
  /**
   * @zh 表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。`2.20.0` 版本增加 `minWidth`,`maxHeight` 的支持。
   * @en Scrolling attribute configuration of the table. The `2.13.0` version adds support for character values. `2.20.0` version adds support for `minWidth`, `maxHeight`.
   */
  scroll: {
    type: Object as PropType<{
      x?: number | string
      y?: number | string
      minWidth?: number | string
      maxHeight?: number | string
    }>,
  },
  /**
   * @zh 分页的属性配置
   * @en Pagination properties configuration
   */
  pagination: {
    type: [Boolean, Object] as PropType<boolean | PaginationProps>,
    default: true,
  },
  /**
   * @zh 分页选择器的位置
   * @en The position of the page selector
   * @values 'tl','top',tr','bl','bottom','br'
   */
  pagePosition: {
    type: String as PropType<TablePagePosition>,
    default: 'br',
  },
  /**
   * @zh 树形表格的缩进距离
   * @en The indentation distance of the tree table
   */
  indentSize: {
    type: Number,
    default: 16,
  },
  /**
   * @zh 表格行 `key` 的取值字段
   * @en Value field of table row `key`
   */
  rowKey: {
    type: String,
    default: 'key',
  },
  /**
   * @zh 是否显示表头
   * @en Whether to show the header
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
   * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)
   * @type VirtualListProps
   */
  virtualListProps: {
    type: Object as PropType<VirtualListProps>,
  },
  /**
   * @zh 单元格合并方法（索引从数据项开始计数）
   * @en Cell merge method (The index starts counting from the data item)
   * @version 2.10.0
   */
  spanMethod: {
    type: Function as PropType<
      (data: {
        record: TableData
        column: ProColumnData | TableOperationColumn
        rowIndex: number
        columnIndex: number
      }) => { rowspan?: number; colspan?: number } | void
    >,
  },
  /**
   * @zh 是否让合并方法的索引包含所有
   * @en Whether to make the index of the span method contain all
   * @version 2.18.0
   */
  spanAll: {
    type: Boolean,
    default: false,
  },
  components: {
    type: Object as PropType<TableComponents>,
  },
  /**
   * @zh 数据懒加载函数，传入时开启懒加载功能
   * @en Data lazy loading function, open the lazy loading function when it is passed in
   * @version 2.13.0
   */
  loadMore: {
    type: Function as PropType<(record: TableData, done: (children?: TableData[]) => void) => void>,
  },
  /**
   * @zh 筛选图标是否左对齐
   * @en Whether the filter icon is aligned to the left
   * @version 2.13.0
   */
  filterIconAlignLeft: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否在子树为空时隐藏展开按钮
   * @en Whether to hide expand button when subtree is empty
   * @version 2.14.0
   */
  hideExpandButtonOnEmpty: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 表格行元素的类名。`2.34.0` 版本增加函数值支持
   * @en The class name of the table row element. The `2.34.0` version adds support for function values.
   * @version 2.16.0
   */
  rowClass: {
    type: [String, Array, Object, Function] as PropType<
      string | any[] | Record<string, any> | ((record: TableData, rowIndex: number) => any)
    >,
  },
  /**
   * @zh 表格拖拽排序的配置
   * @en Table drag and drop sorting configuration
   * @version 2.16.0
   */
  draggable: {
    type: Object as PropType<TableDraggable>,
  },
  rowNumber: {
    type: [Boolean, Object],
  },
  /**
   * @zh 是否允许调整列宽
   * @en Whether to allow the column width to be adjusted
   * @version 2.16.0
   */
  columnResizable: {
    type: Boolean,
  },
  /**
   * @zh 显示表尾总结行
   * @en Show footer summary row
   * @version 2.21.0
   */
  summary: {
    type: [Boolean, Function] as PropType<
      boolean | ((params: { columns: ProColumnData[]; data: TableData[] }) => TableData[])
    >,
  },
  /**
   * @zh 总结行的首列文字
   * @en The first column of text in the summary line
   * @version 2.21.0
   */
  summaryText: {
    type: String,
    default: 'Summary',
  },
  /**
   * @zh 总结行的单元格合并方法
   * @en Cell Merge Method for Summarizing Rows
   * @version 2.21.0
   */
  summarySpanMethod: {
    type: Function as PropType<
      (data: {
        record: TableData
        column: ProColumnData | TableOperationColumn
        rowIndex: number
        columnIndex: number
      }) => { rowspan?: number; colspan?: number } | void
    >,
  },
  /**
   * @zh 已选择的行（受控模式）优先于 `rowSelection`
   * @en Selected row (controlled mode) takes precedence over `rowSelection`
   * @version 2.25.0
   */
  selectedKeys: {
    type: Array as PropType<(string | number)[]>,
  },
  /**
   * @zh 默认已选择的行（非受控模式）优先于 `rowSelection`
   * @en The selected row by default (uncontrolled mode) takes precedence over `rowSelection`
   * @version 2.25.0
   */
  defaultSelectedKeys: {
    type: Array as PropType<(string | number)[]>,
  },
  /**
   * @zh 显示的展开行、子树（受控模式）优先于 `expandable`
   * @en Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable`
   * @version 2.25.0
   */
  expandedKeys: {
    type: Array as PropType<(string | number)[]>,
  },
  /**
   * @zh 默认显示的展开行、子树（非受控模式）优先于 `expandable`
   * @en Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable`
   * @version 2.25.0
   */
  defaultExpandedKeys: {
    type: Array as PropType<(string | number)[]>,
  },
  /**
   * @zh 是否默认展开所有的行
   * @en Whether to expand all rows by default
   * @version 2.25.0
   */
  defaultExpandAllRows: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否开启表头吸顶
   * @en Whether to open the sticky header
   * @version 2.30.0
   */
  stickyHeader: {
    type: [Boolean, Number],
    default: false,
  },
  /**
   * @zh 是否开启虚拟滚动条
   * @en Whether to enable virtual scroll bar
   * @version 2.38.0
   */
  scrollbar: {
    type: [Object, Boolean] as PropType<boolean | ScrollbarProps>,
    default: true,
  },
}

export const baseEmit = {
  'update:selectedKeys': (rowKeys: (string | number)[]) => true,
  'update:expandedKeys': (rowKeys: (string | number)[]) => true,
  /**
   * @zh 点击展开行时触发
   * @en Triggered when a row is clicked to expand
   * @param {string | number} rowKey
   * @param {TableData} record
   */
  expand: (rowKey: string | number, record: TableData) => true,
  /**
   * @zh 已展开的数据行发生改变时触发
   * @en Triggered when the expanded data row changes
   * @param {(string | number)[]} rowKeys
   */
  expandedChange: (rowKeys: (string | number)[]) => true,
  /**
   * @zh 点击行选择器时触发
   * @en Triggered when the row selector is clicked
   * @param {string | number[]} rowKeys
   * @param {string | number} rowKey
   * @param {TableData} record
   */
  select: (rowKeys: (string | number)[], rowKey: string | number, record: TableData) => true,
  /**
   * @zh 点击全选选择器时触发
   * @en Triggered when the select all selector is clicked
   * @param {boolean} checked
   */
  selectAll: (checked: boolean) => true,
  /**
   * @zh 已选择的数据行发生改变时触发
   * @en Triggered when the selected data row changes
   * @param {(string | number)[]} rowKeys
   */
  selectionChange: (rowKeys: (string | number)[]) => true,
  /**
   * @zh 排序规则发生改变时触发
   * @en Triggered when the collation changes
   * @param {string} dataIndex
   * @param {string} direction
   */
  sorterChange: (dataIndex: string, direction: string) => true,
  /**
   * @zh 过滤选项发生改变时触发
   * @en Triggered when the filter options are changed
   * @param {string} dataIndex
   * @param {string[]} filteredValues
   */
  filterChange: (dataIndex: string, filteredValues: string[]) => true,
  /**
   * @zh 表格分页发生改变时触发
   * @en Triggered when the table pagination changes
   * @param {number} page
   */
  pageChange: (page: number) => true,
  /**
   * @zh 表格每页数据数量发生改变时触发
   * @en Triggered when the number of data per page of the table changes
   * @param {number} pageSize
   */
  pageSizeChange: (pageSize: number) => true,
  /**
   * @zh 表格数据发生变化时触发
   * @en Triggered when table data changes
   * @param {TableData[]} data
   * @param {TableChangeExtra} extra
   * @param {TableData[]} currentData
   * @version 2.40.0 增加 currentData
   */
  change: (data: TableData[], extra: TableChangeExtra, currentData: TableData[]) => true,
  /**
   * @zh 点击单元格时触发
   * @en Triggered when a cell is clicked
   * @param {TableData} record
   * @param {ProColumnData} column
   * @param {Event} ev
   */
  cellClick: (record: TableData, column: ProColumnData, ev: Event) => true,
  /**
   * @zh 点击行数据时触发
   * @en Triggered when row data is clicked
   * @param {TableData} record
   * @param {Event} ev
   */
  rowClick: (record: TableData, ev: Event) => true,
  /**
   * @zh 点击表头数据时触发
   * @en Triggered when the header data is clicked
   * @param {ProColumnData} column
   * @param {Event} ev
   */
  headerClick: (column: ProColumnData, ev: Event) => true,
  /**
   * @zh 调整列宽时触发
   * @en Triggered when column width is adjusted
   * @param {string} dataIndex
   * @param {number} width
   * @version 2.28.0
   */
  columnResize: (dataIndex: string, width: number) => true,
}
