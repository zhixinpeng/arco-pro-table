import { App } from 'vue'
import { ProTable } from './ProTable'
import type { ProColumnData, ProTableAction, ProTableProps } from './ProTable'
import type { ProFormProps, ProFormItemProps, ProFormSchema } from './ProForm'

export type { ProColumnData, ProTableAction, ProTableProps }
export type { ProFormProps, ProFormItemProps, ProFormSchema }

export default {
  install: (app: App) => {
    app.component('ArcoProTable', ProTable)
  },
}
