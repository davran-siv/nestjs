export const omitObject = <T>(obj: T, omitKeys: string[]): T => {
  return Object.keys(obj).reduce((result, key) => {
    if (!omitKeys.some(it => it === key)) {
      result[key] = obj[key]
    }
    return result
  }, {} as T)
}
