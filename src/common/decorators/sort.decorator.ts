import {BadRequestException, createParamDecorator, ExecutionContext} from '@nestjs/common'

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
}

export const Sort = createParamDecorator((data: SortData, ctx: ExecutionContext): SortResultDto => {
  const req = ctx.switchToHttp().getRequest()

  let result: SortResultDto = {}
  const query = req.query as SortRequestDto

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
