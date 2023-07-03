import { isArray, isObject } from 'lodash'
import { Ref, unref, toRaw } from 'vue'
import { ProFormAction, ProFormSchema } from '../types'

interface UseFormActionContext {
  emit: (event: 'submit' | 'reset', ...args: any[]) => void
  formModel: Record<string, any>
  formRef: Ref<ProFormAction>
  schemaRef: Ref<ProFormSchema[]>
}

export function useFormEvents(context: UseFormActionContext) {
  const { emit, formModel, formRef, schemaRef } = context

  async function submit(): Promise<void> {
    const form = unref(formRef)
    if (!form) return
    emit('submit', toRaw(formModel))
  }

  async function reset(): Promise<void> {
    const form = unref(formRef)
    if (!form) return
    Object.keys(formModel).forEach((key) => {
      delete formModel[key]
    })
    submit()
    emit('reset')
  }

  async function resetSchema(data: Partial<ProFormSchema> | Partial<ProFormSchema>[]) {
    let updateData: Partial<ProFormSchema>[] = []
    if (isObject(data)) {
      updateData.push(data as ProFormSchema)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every((item) => Reflect.has(item, 'field') && item.field)

    if (!hasField) {
      throw new Error('schema 内必须配置 `field` 字段')
    }

    schemaRef.value = updateData as ProFormSchema[]
  }

  return {
    submit,
    reset,
    resetSchema,
  }
}
