import { ArgumentMetadata, Injectable } from '@nestjs/common'

@Injectable()
export class ParseOptionalIntPipe {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      return value
    }
    return parseInt(value, 10)
  }
}
