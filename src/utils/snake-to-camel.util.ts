import { isObject } from './variable-type.util'

const snakeToCamel = (str: string): string => {
  return str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
                    .replace('-', '')
                    .replace('_', '')
  )
}

const snakeToCamelInObject = (item: Object) => {
  return Object.entries(item).reduce((acc: {}, [key, value]) => {
    if (isObject(value)) {
      acc[snakeToCamel(key)] = snakeToCamelInObject(value)
      return acc
    }
    if (Array.isArray(value)) {
      acc[snakeToCamel(key)] = snakeToCamelInArray(value)
      return acc
    }
    acc[snakeToCamel(key)] = value
    return acc
  }, {})
}

const snakeToCamelInArray = (items: any[]): any[] => {
  return items.map(item => {
    if (isObject(item)) {
      return snakeToCamelInObject(item)
    }
    if (Array.isArray(item)) {
      return snakeToCamelInArray(item)
    }
    return snakeToCamel(item)
  })
}

const deepSnakeToCamel = (item: any[] | Object | string): any[] | Object | string => {
  if (isObject(item)) {
    return snakeToCamelInObject(item)
  }
  if (Array.isArray(item)) {
    return snakeToCamelInArray(item)
  }
  if (typeof item === 'string') {
    return snakeToCamel(item)
  }
  return item
}

export {
  snakeToCamel,
  deepSnakeToCamel,
  snakeToCamelInArray,
  snakeToCamelInObject
}
