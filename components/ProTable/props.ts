import { PropType } from 'vue'

import { VirtualListProps } from '@arco-design/web-vue/es/_components/virtual-list-v2/interface'
import {
  TableBorder,
  TableComponents,
  TableData,
  TableDraggable,
  TableExpandable,
  TableOperationColumn,
  TablePagePosition,
  TableRowSelection,
} from '@arco-design/web-vue/es/table/interface'
import type { Size } from '@arco-design/web-vue'

import { ProFormProps } from '../ProForm/types'
import { ProColumnData } from './types'
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
   * 表格的数据
   */
  data: {
    type: Array as PropType<TableData[]>,
    default: () => [],
  },
  /**
   * 是否显示边框
   */
  bordered: {
    type: [Boolean, Object] as PropType<boolean | TableBorder>,
    default: true,
  },
  /**
   * 是否显示选中效果
   */
  hoverable: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否开启斑马纹效果
   */
  stripe: {
    type: Boolean,
    default: false,
  },
  /**
   * 表格的大小
   * @values 'mini','small','medium','large'
   * @defaultValue 'large'
   */
  size: {
    type: String as PropType<Size>,
    default: 'large',
  },
  /**
   * 表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。
   */
  tableLayoutFixed: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为加载中状态
   */
  loading: {
    type: [Boolean, Object],
    default: false,
  },
  /**
   * 表格的行选择器配置
   */
  rowSelection: {
    type: Object as PropType<TableRowSelection>,
  },
  /**
   * 表格的展开行配置
   */
  expandable: {
    type: Object as PropType<TableExpandable>,
  },
  /**
   * 表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。`2.20.0` 版本增加 `minWidth`,`maxHeight` 的支持。
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
   * 分页的属性配置
   */
  pagination: {
    type: [Boolean, Object] as PropType<boolean | PaginationProps>,
    default: true,
  },
  /**
   * 分页选择器的位置
   * @values 'tl','top',tr','bl','bottom','br'
   */
  pagePosition: {
    type: String as PropType<TablePagePosition>,
    default: 'br',
  },
  /**
   * 树形表格的缩进距离
   */
  indentSize: {
    type: Number,
    default: 16,
  },
  /**
   * 表格行 `key` 的取值字段
   */
  rowKey: {
    type: String,
    default: 'key',
  },
  /**
   * 是否显示表头
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
   * @type VirtualListProps
   */
  virtualListProps: {
    type: Object as PropType<VirtualListProps>,
  },
  /**
   * 单元格合并方法（索引从数据项开始计数）
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
   * 是否让合并方法的索引包含所有
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
   * 数据懒加载函数，传入时开启懒加载功能
   */
  loadMore: {
    type: Function as PropType<(record: TableData, done: (children?: TableData[]) => void) => void>,
  },
  /**
   * 筛选图标是否左对齐
   */
  filterIconAlignLeft: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在子树为空时隐藏展开按钮
   */
  hideExpandButtonOnEmpty: {
    type: Boolean,
    default: false,
  },
  /**
   * 表格行元素的类名。`2.34.0` 版本增加函数值支持
   */
  rowClass: {
    type: [String, Array, Object, Function] as PropType<
      string | any[] | Record<string, any> | ((record: TableData, rowIndex: number) => any)
    >,
  },
  /**
   * 表格拖拽排序的配置
   */
  draggable: {
    type: Object as PropType<TableDraggable>,
  },
  rowNumber: {
    type: [Boolean, Object],
  },
  /**
   * 是否允许调整列宽
   */
  columnResizable: {
    type: Boolean,
  },
  /**
   * 显示表尾总结行
   */
  summary: {
    type: [Boolean, Function] as PropType<
      boolean | ((params: { columns: ProColumnData[]; data: TableData[] }) => TableData[])
    >,
  },
  /**
   * 总结行的首列文字
   */
  summaryText: {
    type: String,
    default: 'Summary',
  },
  /**
   * 总结行的单元格合并方法
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
   * 已选择的行（受控模式）优先于 `rowSelection`
   */
  selectedKeys: {
    type: Array as PropType<(string | number)[]>,
  },
  /**
   * 默认已选择的行（非受控模式）优先于 `rowSelection`
   */
  defaultSelectedKeys: {
    type: Array as PropType<(string | number)[]>,
  },
  /**
   * 显示的展开行、子树（受控模式）优先于 `expandable`
   */
  expandedKeys: {
    type: Array as PropType<(string | number)[]>,
  },
  /**
   * 默认显示的展开行、子树（非受控模式）优先于 `expandable`
   */
  defaultExpandedKeys: {
    type: Array as PropType<(string | number)[]>,
  },
  /**
   * 是否默认展开所有的行
   */
  defaultExpandAllRows: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否开启表头吸顶
   */
  stickyHeader: {
    type: [Boolean, Number],
    default: false,
  },
  /**
   * 是否开启虚拟滚动条
   */
  scrollbar: {
    type: [Object, Boolean] as PropType<boolean | ScrollbarProps>,
    default: true,
  },
}
