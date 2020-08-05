interface DateRange {
  from: Date
  to: Date
}

export const isTwoDateRangeNotConflict = (first: DateRange, second: DateRange): boolean => {
  if (first.from.getTime() <= second.from.getTime() && first.to.getTime() >= second.from.getTime()) {
    return false
  }
  if (first.from.getTime() >= second.from.getTime() && first.from.getTime() <= second.to.getTime()) {
    return false
  }
  if (first.from.getTime() >= second.from.getTime() && first.to.getTime() <= second.to.getTime()) {
    return false
  }
  return !(first.from.getTime() <= second.from.getTime() && first.to.getTime() >= second.to.getTime())
}

export const isDateRangeValid = (range: DateRange): boolean => {
  return range.from.getTime() <= range.to.getTime()
}

export const isDateInRange = (range: DateRange | { from: string, to: string }, date: Date = new Date) => {
  if (!(range.from instanceof Date) || !(range.to instanceof Date)) {
    return false
  }
  return (range.from.getTime() <= date.getTime() && date.getTime() <= range.to.getTime())
}


export const convertDateToDBFormat = (date: Date): string => {
  return date.toJSON().slice(0, 19).replace('T', ' ')
}
