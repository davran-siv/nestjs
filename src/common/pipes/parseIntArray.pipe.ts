import { ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common'
import { isArray } from '../../utils'

@Injectable()
export class ParseIntArrayPipe {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!(value && isArray(value))) {
      throw new BadRequestException(`Validation failed for query: ${metadata.data} (array of numeric string is expected)`)
    }
    return value.map(it => parseInt(it, 10))
  }
}
