import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { isArray, isObject } from '../../utils'

export enum QueryValueType {
  number = 'NUMBER',
  string = 'STRING',
  arrayOfNumbers = 'ARRAY_OF_NUMBERS',
  arrayOfStrings = 'ARRAY_OF_STRINGS',
  boolean = 'BOOLEAN',
  date = 'DATE',
  dateRange = 'DATE_RANGE',
  enum = 'ENUM',
  existence = 'EXISTENCE',
}

interface DataType {
  [key: string]: QueryValueType | EnumValue
}

interface EnumValue {
  type: QueryValueType.enum,
  enum: Object
}

interface QueryValue {
  [key: string]: any
}

export class DateRange {
  from?: Date | undefined
  to?: Date | undefined
}


const getProperValue = (data: DataType, query: QueryValue) => {
  return Object.entries(data)
    .reduce((acc, [key, value]) => {
      if (query[key]) {
        const normalizedValue = isObject(value) ? value.type : value
        switch (normalizedValue) {
          case QueryValueType.number:
            acc[key] = parseInt(query[key], 10)
            break
          case QueryValueType.arrayOfNumbers:
            if (!isArray(query[key])) {
              throw new BadRequestException(`Wrong type of filter ${key}. Must be ${QueryValueType.arrayOfNumbers}`)
            }
            acc[key] = query[key].map(it => parseInt(it, 10))
            break
          case QueryValueType.arrayOfStrings:
            if (!isArray(query[key])) {
              throw new BadRequestException(`Wrong type of filter ${key}. Must be ${QueryValueType.arrayOfStrings}`)
            }
            acc[key] = query[key]
            break
          case QueryValueType.string:
            acc[key] = query[key]
            break
          case QueryValueType.boolean:
            if (query[key] === true || query[key] === 'true') {
              acc[key] = true
              break
            }
            if (query[key] === false || query[key] === 'false') {
              acc[key] = false
              break
            }
            throw new BadRequestException(`Validation failed (boolean string is expected for '${key}' field)`)
          case QueryValueType.date:
            try {
              acc[key] = new Date(query[key])
              break
            } catch (e) {
              throw new BadRequestException(`Validation failed (date format is expected for '${key}' field)`)
            }
          case QueryValueType.dateRange:
            try {
              const { from, to } = isObject(query[key]) ? query[key] : JSON.parse(query[key])
              acc[key] = {
                from: from ? new Date(from) : undefined,
                to: to ? new Date(to) : undefined,
              }
              break
            } catch (e) {
              throw new BadRequestException(`Validation failed (date range format is expected for '${key}' field)`)
            }
          case QueryValueType.enum:
            if (!(isObject(value) && value.enum)) {
              throw new InternalServerErrorException('No enum object for enum filter')
            }
            if (!Object.values(value.enum).some(it => it.toUpperCase() === query[key].toUpperCase())) {
              throw new BadRequestException(`Validation failed (Not supported value for '${key}' field)`)
            }
            acc[key] = query[key].toUpperCase()
            break
          case QueryValueType.existence:
            const [field, isExists] = query[key].split(':')
            switch (isExists) {
              case 'true':
                acc[key] = true
                break
              case 'false':
                acc[key] = false
                break
              default:
                throw new BadRequestException(`Validation failed (Not supported value for '${key}' field). Should be exist:true or exist:true`)
            }
            break
        }
      }
      return acc
    }, {})
}

export const Filter = createParamDecorator((data: DataType, ctx: ExecutionContext): QueryValue => {
  const ctxGraph: ExecutionContextHost = GqlExecutionContext.create(ctx);
  const requestType = ctxGraph.getType<GqlContextType>()

  if(requestType === 'graphql'){
    return getProperValue(data, ctxGraph.getArgs())
  }

  const request = ctx.switchToHttp().getRequest()
  return getProperValue(data, request.query)
})
