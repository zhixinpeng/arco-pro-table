import type { Component } from 'vue'
import {
  Input,
  InputGroup,
  InputNumber,
  InputPassword,
  InputSearch,
  Textarea,
  AutoComplete,
  Select,
  TreeSelect,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Rate,
  Switch,
  Slider,
  DatePicker,
  TimePicker,
  Upload,
  Cascader,
  MonthPicker,
  YearPicker,
  WeekPicker,
  QuarterPicker,
  RangePicker,
} from '@arco-design/web-vue'
import { ComponentType } from './types'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', Input)
componentMap.set('InputGroup', InputGroup)
componentMap.set('InputNumber', InputNumber)
componentMap.set('InputPassword', InputPassword)
componentMap.set('InputSearch', InputSearch)
componentMap.set('Textarea', Textarea)
componentMap.set('AutoComplete', AutoComplete)
componentMap.set('Select', Select)
componentMap.set('TreeSelect', TreeSelect)
componentMap.set('Radio', Radio)
componentMap.set('RadioGroup', RadioGroup)
componentMap.set('Checkbox', Checkbox)
componentMap.set('CheckboxGroup', CheckboxGroup)
componentMap.set('Rate', Rate)
componentMap.set('Switch', Switch)
componentMap.set('Slider', Slider)
componentMap.set('DatePicker', DatePicker)
componentMap.set('TimePicker', TimePicker)
componentMap.set('Upload', Upload)
componentMap.set('Cascader', Cascader)
componentMap.set('MonthPicker', MonthPicker)
componentMap.set('YearPicker', YearPicker)
componentMap.set('WeekPicker', WeekPicker)
componentMap.set('QuarterPicker', QuarterPicker)
componentMap.set('RangePicker', RangePicker)

export const dateItemType = [
  'DatePicker',
  'YearPicker',
  'QuarterPicker',
  'MonthPicker',
  'WeekPicker',
  'TimePicker',
  'RangePicker',
]

export { componentMap }
