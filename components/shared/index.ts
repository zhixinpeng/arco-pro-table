import { cloneDeep, isObject, isFunction } from 'lodash'
import { unref } from 'vue'

export function getDynamicProps<T extends Record<string, unknown>, U>(props: T): Partial<U> {
  const ret: Record<any, any> = {}

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Record<any, any>)[key])
  })

  return ret as Partial<U>
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  const res: any = cloneDeep(src)
  for (key in target) {
    res[key] =
      isObject(res[key]) && !isFunction(res[key]) ? deepMerge(res[key], target[key]) : target[key]
  }
  return res
}
