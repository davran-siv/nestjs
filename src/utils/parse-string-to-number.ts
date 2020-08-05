export const parseIntArray = (value: string): number[] => {
  const splittedValue = value.split(',')
  return splittedValue.map(it => parseInt(it, 10))
}
