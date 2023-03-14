import { computed, ComputedRef, Ref, shallowReactive, unref, watch } from 'vue'
import { ProFormSchema } from '../types'

interface UseAdvancedContext {
  isAdvanced: Ref<boolean>
  getSchema: ComputedRef<ProFormSchema[]>
}

export function useAdvanced(context: UseAdvancedContext) {
  const { isAdvanced, getSchema } = context

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
    return schema.length > 3
  })

  function updateAdvanced() {
    const schema = unref(getSchema)
    const advanced = unref(isAdvanced)
    schema.forEach((item, index) => {
      if (index <= 2) {
        fieldsIsAdvancedMap[item.field] = true
      } else {
        fieldsIsAdvancedMap[item.field] = advanced
      }
    })
  }

  return { showAdvanced, fieldsIsAdvancedMap }
}
