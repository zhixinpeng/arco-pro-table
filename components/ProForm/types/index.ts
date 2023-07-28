import { FieldData } from '@arco-design/web-vue/es/form/interface'

const FORM_LAYOUTS = ['horizontal', 'vertical', 'inline'] as const
export type FormLayout = (typeof FORM_LAYOUTS)[number]
const FORM_LABEL_ALIGNS = ['left', 'right'] as const
export type FormLabelAlign = (typeof FORM_LABEL_ALIGNS)[number]

export interface ProFormProps {
  /**
   * 表单设置规则
   */
  schemas?: ProFormSchema[]

  /**
   * 表单数据对象
   */
  model: object

  /**
   * 表单的布局方式，包括水平、垂直、多列
   */
  layout: FormLayout

  /**
   * 标签元素布局选项。参数同 `<col>` 组件一致
   */
  labelColProps: object

  /**
   * 表单控件布局选项。参数同 `<col>` 组件一致
   */
  wrapperColProps: object

  labelColStyle: object
  wrapperColStyle: object

  /**
   * 标签的对齐方向
   */
  labelAlign: FormLabelAlign

  /**
   * 标题
   */
  title: string

  /**
   * 列数
   */
  cols: number

  /** 初始值 */
  initFormModel: object
}

export interface ProFormAction {
  /**
   * 重置表单数据
   * @param {string | string[]} field
   */
  resetFields(field?: string | string[]): void

  /**
   * 设置表单项的值和状态
   * @param {Record<string, FieldData>} data
   */
  setFields(data: Record<string, FieldData>): void
}

export interface ProFormItemProps {
  /**
   * 表单元素在数据对象中的path（数据项必填）
   */
  field: string

  /**
   * 标签的文本
   */
  label: string

  /**
   * 是否显示冒号
   */
  showColon: boolean

  /**
   * 标签元素布局选项。参数同 `<col>` 组件一致
   */
  labelColProps: object

  /**
   * 表单控件布局选项。参数同 `<col>` 组件一致
   */
  wrapperColProps: object

  /**
   * 是否隐藏标签
   */
  hideLabel: boolean

  /**
   * 标签元素布局组件的 style
   */
  labelColStyle: object

  /**
   * 表单控件布局组件的 style
   */
  wrapperColStyle: object

  /**
   * 表单项布局选项。参数同 `<row>` 组件一致
   */
  rowProps: object

  /**
   * 表单项布局组件的 class
   */
  rowClass: string | [] | object

  /**
   * 表单控件包裹层的 class
   */
  contentClass: string | [] | object

  /**
   * 内容层是否开启 flex 布局
   */
  contentFlex: boolean

  /**
   * 设置标签 `Col` 组件的 flex 属性。设置时表单 `Col` 组件的 flex 属性会被设置为 `auto`。
   */
  labelColFlex: number | string

  /**
   * 表单项标签渲染的元素
   */
  labelComponent: string

  /**
   * 表单项元素的属性
   */
  labelAttrs: string
}

export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'Textarea'
  | 'InputNumber'
  | 'Select'
  | 'TreeSelect'
  | 'Radio'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'Cascader'
  | 'DatePicker'
  | 'YearPicker'
  | 'QuarterPicker'
  | 'MonthPicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'Upload'
  | 'Slider'
  | 'Rate'
  | 'RangePicker'

export interface ProFormSchema {
  /**
   * 表单元素在数据对象中的path（数据项必填）
   */
  field: string

  /**
   * 标签的文本
   */
  label: string

  /**
   * 表单 <form-item> 组件属性
   */
  props?: Partial<ProFormItemProps>

  /**
   * 表单 <form-item> 内输入组件类型
   */
  component: ComponentType

  /**
   * 表单 <form-item> 内输入组件属性
   */
  componentProps?:
    | ((opt: { schema: ProFormSchema; formModel: Record<string, any> }) => Record<string, any>)
    | object
}
