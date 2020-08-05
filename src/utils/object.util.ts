import { BadRequestException } from '@nestjs/common'
import { ArrayAsObject } from '../common/generics/array-as-object'
import { isNullOrUndefined } from './is-null-or-undefined.util'
import { isArray, isNumeric, isString } from './variable-type.util'

/**
 *
 * @param arr
 * @param key. To get value from child objects provide path to property adding dot. Ex: product.id
 * @param arrayValue If true then value will be in array format and pushed to existing value
 */
export const arrayToObject = <T>(arr: any[], key: string = 'id', arrayValue: boolean = false): ArrayAsObject<T> => {
  const keyParts = key.split('.')

  if (isNullOrUndefined(arr)) {
    throw new BadRequestException(`Unable to convert array to object`)
  }

  return arr.reduce((acc, cur) => {
    let value
    if (keyParts.length === 1) {
      value = cur[key]
    } else {
      let keyValue = null
      for (const keyPart of keyParts) {
        keyValue = keyValue ? keyValue[keyPart] : cur[keyPart]
      }
      value = keyValue
    }

    if (value) {
      if (arrayValue) {
        acc[value] ? acc[value].push(cur) : acc[value] = [cur]
      } else {
        acc[value] = cur
      }
    }
    return acc
  }, {} as ArrayAsObject<T>)
}

export const listToDictionary = <T, K extends keyof T>(array: T[], key: K, normalizer?: Function): { [key in number | string]: Omit<T, K> } => {
  return array.reduce((acc, cur) => {
    const value = cur[key]
    if (!(isNumeric(value) || isString(value))) {
      throw new BadRequestException('Key should be ether number or string')
    }
    const keyValue: number | string = value
    const { [key]: deletedKey, ...exceptKey } = cur

    if (isArray(exceptKey)) {
      // @ts-ignore
      acc[keyValue] = exceptKey.map(it => normalizer ? normalizer(it) : it)
      return acc
    }

    acc[keyValue] = normalizer ? normalizer(exceptKey) : exceptKey
    return acc
  }, {} as { [key in number | string]: Omit<T, K> })
}

export const listToArrayDictionary = <T, K extends keyof T>(array: T[], key: K, normalizer?: Function): { [key in number | string]: Omit<T, K>[] } => {
  return array.reduce((acc, cur) => {
    const value = cur[key]
    if (!(isNumeric(value) || isString(value))) {
      throw new BadRequestException('Key should be ether number or string')
    }
    const keyValue: number | string = value
    const { [key]: deletedKey, ...exceptKey } = cur

    const normalized = isArray(exceptKey)
      ? exceptKey.map(it => normalizer ? normalizer(it) : it)
      : normalizer ? normalizer(exceptKey) : exceptKey

    acc[keyValue] = acc[keyValue] ? [...acc[keyValue], normalized] : [normalized]
    return acc
  }, {} as { [key in number | string]: Omit<T, K>[] })
}
