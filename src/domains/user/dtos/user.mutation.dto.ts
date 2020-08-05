import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { UserEntity } from '../../../persistence/user/user.entity'

export class UserCreateRequestDTO {
  @ApiProperty()
  readonly firstName: string
  @ApiProperty()
  readonly lastName: string
  @ApiProperty()
  readonly username: string
  @ApiProperty()
  readonly password: string
  @ApiProperty()
  readonly passwordConfirmation: string
  @ApiProperty()
  readonly emailAddress: string
}

export class UserUpdateRequestDTO {
  @ApiProperty()
  readonly id: string
  @ApiPropertyOptional()
  readonly firstName?: string
  @ApiPropertyOptional()
  readonly lastName?: string
  @ApiPropertyOptional()
  readonly username?: string
  @ApiPropertyOptional()
  readonly emailAddress?: string
}
