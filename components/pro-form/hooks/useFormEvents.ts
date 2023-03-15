import { cloneDeep, isArray, isObject } from 'lodash'
import { Ref, unref, toRaw, ComputedRef } from 'vue'
import { defaultValueComponents } from '../componentMap'
import { ProFormAction, ProFormSchema } from '../types'

interface UseFormActionContext {
  emit: (event: 'submit', ...args: any[]) => void
  formModel: Record<string, any>
  formRef: Ref<ProFormAction>
  getSchema: ComputedRef<ProFormSchema[]>
  defaultValueRef: Ref<Record<string, any>>
  schemaRef: Ref<ProFormSchema[]>
}

export function useFormEvents(context: UseFormActionContext) {
  const { emit, formModel, formRef, getSchema, defaultValueRef, schemaRef } = context

  async function submit(): Promise<void> {
    const form = unref(formRef)
    if (!form) return
    emit('submit', toRaw(formModel))
  }

  async function reset(): Promise<void> {
    const form = unref(formRef)
    if (!form) return
    Object.keys(formModel).forEach((key) => {
      const schema = unref(getSchema).find((item) => item.field === key)
      const isInput = schema?.component && defaultValueComponents.includes(schema.component)
      const defaultValue = cloneDeep(defaultValueRef.value[key])
      formModel[key] = isInput ? defaultValue || '' : defaultValue
    })
    submit()
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
      throw new Error(
        'All children of the form Schema array that need to be updated must contain the `field` field',
      )
    }
    schemaRef.value = updateData as ProFormSchema[]
  }

  return {
    submit,
    reset,
    resetSchema,
  }
}
