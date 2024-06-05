import { isString } from 'lodash-es'

class CrUIError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'CrUIError'
  }
}

export function throwError(scope: string, msg: string) {
  throw new CrUIError(`[${scope}]: ${msg}`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    const err = isString(scope) ? new CrUIError(`[${scope}]: ${msg}`) : scope
    console.warn(err)
  }
}
