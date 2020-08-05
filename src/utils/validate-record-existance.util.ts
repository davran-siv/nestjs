import { BadRequestException } from '@nestjs/common'
import { arrayToObject } from './object.util'
import { isArray } from './variable-type.util'

export const validateRecordExistence = (initial: number[] | number, fromDB: { id: number }[], errorTemplate: string) => {
  if (isArray(initial)) {
    return validateManyRecordExistence(initial as number[], fromDB, errorTemplate)
  }
  return validateOneRecordExistence(initial as number, fromDB, errorTemplate)
}

const validateOneRecordExistence = (id: number, fromDB: { id: number }[], errorTemplate: string): void => {
  if (!!fromDB.length) {
    return
  }
  throw new BadRequestException(`${errorTemplate} ${id}`)
}

const validateManyRecordExistence = (ids: number[], records: { id: number }[], errorTemplate: string): void => {
  const idsWithoutDuplicates = [...new Set(ids)]
  if (records.length === idsWithoutDuplicates.length) {
    return
  }

  const recordsAsObject = arrayToObject(records)

  const notExists = idsWithoutDuplicates.filter(it => !recordsAsObject[it])

  throw new BadRequestException(`${errorTemplate} ${notExists}`)
}
