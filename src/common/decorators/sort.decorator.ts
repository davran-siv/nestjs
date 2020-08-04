import { I18nExpectedLanguage } from '@altermeliora/payform-types'
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'

interface SortRequestDto {
  skip?: string
  limit?: string
  sortBy?: string
}

export interface SortData {
  allowedFieldsForSorting: string[]
}

export enum SortByTypes {
  asc = 'ASC',
  desc = 'DESC'
}

export interface SortResultDto {
  skip?: number
  limit?: number
  sortBy?: [string, SortByTypes]
  currentLanguage?: I18nExpectedLanguage
}

export const Sort = createParamDecorator((data: SortData, ctx: ExecutionContext): SortResultDto => {
  const req = ctx.switchToHttp().getRequest()
  const reqGraphql: ExecutionContextHost = GqlExecutionContext.create(ctx)
  const reqType = reqGraphql.getType<GqlContextType>()

  let result: SortResultDto = {}
  const query = reqType === 'graphql' ? reqGraphql.getArgs() as SortRequestDto : req.query as SortRequestDto

  if (query.skip) {
    const skip = parseInt(query.skip, 10)
    result.skip = skip > 0 ? skip : 0
  }
  if (query.limit) {
    const limit = parseInt(query.limit, 10)
    result.limit = limit > 0 ? limit : 0
  }

  if (query.sortBy && data.allowedFieldsForSorting) {
    const [key, value] = query.sortBy.split(':')
    const valueAsUpperCase = value.toLocaleUpperCase()
    if (!(valueAsUpperCase === SortByTypes.asc || valueAsUpperCase === SortByTypes.desc)) {
      throw new BadRequestException(`'${value}' command is not allowed for sorting`)
    }
    if (data.allowedFieldsForSorting.indexOf(key) > -1) {
      result.sortBy = [key, valueAsUpperCase] as [string, SortByTypes]
    }
  }

  return result
})
