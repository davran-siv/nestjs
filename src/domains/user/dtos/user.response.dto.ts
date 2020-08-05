import {ApiProperty} from '@nestjs/swagger'
import {UserEntity} from '../../../persistence/user/user.entity'

export class UserResponseDto {
  @ApiProperty()
  readonly id: string
  @ApiProperty()
  readonly firstName: string
  @ApiProperty()
  readonly lastName: string
  @ApiProperty()
  readonly username: string
  @ApiProperty()
  readonly emailAddress: string

  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.username = model.username
    this.emailAddress = model.emailAddress
  }

  static of(model: UserEntity): UserResponseDto
  static of(model: UserEntity[]): UserResponseDto[]

  static of(model: UserEntity | UserEntity[]): UserResponseDto | UserResponseDto[] {
    return model instanceof Array ? model.map(it => new UserResponseDto(it)) : new UserResponseDto(model)
  }
}
