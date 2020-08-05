const toFixed = (value: number, precision: number = 2): number => {
  const power = Math.pow(10, precision || 0)
  return Math.round(value * power) / power
}

export {
  toFixed,
}
