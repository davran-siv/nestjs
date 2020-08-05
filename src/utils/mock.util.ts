import { isArray, isFunction, isObject } from './variable-type.util'

export const getMocks = (mockedData: any): any => {
  if (isArray(mockedData)) {
    return mockedData.map(it => getMockedObject(it))
  }
  if (isObject(mockedData)) {
    return getMockedObject(mockedData)
  }
  return mockedData
}

const getMockedObject = (mockedObject: Object) => {
  return Object.entries(mockedObject).reduce((acc, [key, value]) => {
    acc[key] = isFunction(value) ? value() : getMocks(value)
    return acc
  }, {})
}
