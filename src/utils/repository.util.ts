import { DateRange } from '../common/decorators/filter.decorator'

export const searchByTwoColumns = (firstColumnName: string, lastColumnName, queryField: string) => {
  return `(CONCAT_WS(\' \', ${firstColumnName}, ${lastColumnName}) ILIKE :${queryField})
          OR CONCAT_WS(\' \', ${lastColumnName}, ${firstColumnName}) ILIKE :${queryField}
          `
}

export const filterByDateRange = (columnName: string, date: DateRange) => {
  const { from, to } = date
  if (from && to) {
    return `${columnName} BETWEEN :from AND :to`
  }
  if (from) {
    return `${columnName} >= :from`
  }
  return `${columnName} <= :to`
}
