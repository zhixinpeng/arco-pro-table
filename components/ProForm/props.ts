import { PropType } from 'vue'
import type { Size } from '@arco-design/web-vue'

import { FormLabelAlign, FormLayout, ProFormSchema } from './types'

export const baseProps = {
  schemas: {
    type: Array as PropType<ProFormSchema[]>,
    default: () => [],
  },
  model: {
    type: Object,
    required: true,
  },
  layout: {
    type: String as PropType<FormLayout>,
    default: 'horizontal',
  },
  size: {
    type: String as PropType<Size>,
  },
  labelColProps: {
    type: Object,
    default: () => ({ span: 5, offset: 0 }),
  },
  wrapperColProps: {
    type: Object,
    default: () => ({ span: 19, offset: 0 }),
  },
  labelColStyle: Object,
  wrapperColStyle: Object,
  labelAlign: {
    type: String as PropType<FormLabelAlign>,
    default: 'right',
  },
  autoLabelWidth: {
    type: Boolean,
    default: false,
  },
  title: String,
  cols: {
    type: Number,
    default: 4,
  },
  initFormModel: {
    type: Object,
    default: () => ({}),
  },
}
