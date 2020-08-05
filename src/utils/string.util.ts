import { isNullOrUndefined } from './is-null-or-undefined.util'

export const replaceIfNulOrUndefined = (string: any, replaceTo = '') => {
  return isNullOrUndefined(string) ? '' : string
}
