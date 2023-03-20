import type { Ref } from 'vue'
import { inject, provide } from 'vue'

import { ProTableAction } from '../types/action'

const key = Symbol('pro-table')

type Instance = ProTableAction & {
  wrapRef: Ref<HTMLElement | null>
}

export function createTableContext(instance: Instance) {
  provide(key, instance)
}

export function useTableContext(): Instance {
  return inject(key) as Instance
}
