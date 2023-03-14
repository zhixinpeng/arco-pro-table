export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}
