import {ArgumentMetadata, Injectable} from '@nestjs/common'
import {isArray, isString} from 'src/utils/variable-type.util'

@Injectable()
export class ParseObjectPipe {
  parse(str: string) {
    try {
      return JSON.parse(str)
    } catch (e) {
      console.error('Cannot parse object =>', str)
      return str
    }
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (isArray(value)) {
      return value.map(it => this.parse(it))
    }
    if (isString(value)) {
      this.parse(value)
    }
    return value
  }
}
