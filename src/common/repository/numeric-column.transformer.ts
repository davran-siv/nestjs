import { isNullOrUndefined } from '../../utils'

export class NumericColumnTransformer {
  to(data?: number | null): number | null | undefined {
    if (!isNullOrUndefined(data)) {
      return data
    }
    return data
  }

  from(data?: string | null): number | null | undefined {
    if (!isNullOrUndefined(data)) {
      const res = parseFloat(data)
      if (isNaN(res)) {
        return null
      } else {
        return res
      }
    }
    return data
  }
}
