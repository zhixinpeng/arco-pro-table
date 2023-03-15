import { App } from 'vue'
import { ProTable } from './pro-table'
import type { ProColumnData, ProTableAction, ProTableProps } from './pro-table'
import type { ProFormProps, ProFormItemProps, ProFormSchema } from './pro-form'

export type { ProColumnData, ProTableAction, ProTableProps }
export type { ProFormProps, ProFormItemProps, ProFormSchema }

export default {
  install: (app: App) => {
    app.component('ArcoProTable', ProTable)
  },
}
