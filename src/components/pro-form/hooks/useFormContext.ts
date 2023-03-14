import { inject, InjectionKey, provide } from 'vue'

export interface FormInstance {
  resetAction: () => Promise<void>
  submitAction: () => Promise<void>
}

const key: InjectionKey<FormInstance> = Symbol('pro-form')

export function createFormContext(context: FormInstance) {
  provide(key, context)
}

export function useFormContext(): FormInstance {
  return inject(key) as FormInstance
}
