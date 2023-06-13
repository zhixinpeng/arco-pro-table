import { computed, ComputedRef, Ref, shallowReactive, unref, watch } from 'vue'
import { ProFormProps, ProFormSchema } from '../types'

interface UseAdvancedContext {
  isAdvanced: Ref<boolean>
  getSchema: ComputedRef<ProFormSchema[]>
  formProps: ProFormProps
}

export function useAdvanced(context: UseAdvancedContext) {
  const { isAdvanced, getSchema, formProps } = context

  const fieldsIsAdvancedMap = shallowReactive<Record<string, boolean>>({})

  watch(
    [() => unref(getSchema), () => unref(isAdvanced)],
    () => {
      updateAdvanced()
    },
    { immediate: true },
  )

  const showAdvanced = computed(() => {
    const schema = unref(getSchema)
    return schema.length > formProps.cols - 1
  })

  function updateAdvanced() {
    const schema = unref(getSchema)
    const advanced = unref(isAdvanced)
    schema.forEach((item, index) => {
      if (index < formProps.cols - 1) {
        fieldsIsAdvancedMap[item.field] = true
      } else {
        fieldsIsAdvancedMap[item.field] = advanced
      }
    })
  }

  return { showAdvanced, fieldsIsAdvancedMap }
}
