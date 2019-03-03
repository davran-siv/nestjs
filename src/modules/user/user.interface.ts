import { UserEntity } from './user.entity'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateUserRequestDTO {
  @ApiModelProperty()
  readonly firstName: string
  @ApiModelProperty()
  readonly lastName: string
  @ApiModelProperty()
  readonly username: string
  @ApiModelProperty()
  readonly password: string
  @ApiModelProperty()
  readonly passwordConfirmation: string
  @ApiModelProperty()
  readonly emailAddress: string
  @ApiModelProperty()
  readonly birthDate: string
  @ApiModelProperty({required: false})
  readonly middleName?: string
  @ApiModelProperty({required: false})
  readonly photo?: string
}

export class UpdateUserRequestDTO {
  @ApiModelProperty()
  readonly id: string
  @ApiModelProperty({required: false})
  readonly firstName?: string
  @ApiModelProperty({required: false})
  readonly lastName?: string
  @ApiModelProperty({required: false})
  readonly middleName?: string
  @ApiModelProperty({required: false})
  readonly username?: string
  @ApiModelProperty({required: false})
  readonly emailAddress?: string
  @ApiModelProperty({required: false})
  readonly birthDate?: string
  @ApiModelProperty({required: false})
  readonly photo?: string
}

export class UserResponseDTO {
  @ApiModelProperty()
  id: string
  @ApiModelProperty()
  firstName: string
  @ApiModelProperty()
  lastName: string
  @ApiModelProperty()
  username: string
  @ApiModelProperty()
  emailAddress: string
  @ApiModelProperty()
  birthDate: string
  @ApiModelProperty()
  middleName: string | null
  @ApiModelProperty()
  photo: string | null

  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.middleName = model.middleName
    this.username = model.username
    this.emailAddress = model.emailAddress
    this.birthDate = model.birthDate
    this.photo = model.photo
  }

  static of(model: UserEntity): UserResponseDTO
  static of(model: UserEntity[]): UserResponseDTO[]

  static of(model: UserEntity | UserEntity[]): UserResponseDTO | UserResponseDTO[] {
    return model instanceof Array ? model.map(it => new UserResponseDTO(it)) : new UserResponseDTO(model)
  }
}

export class UserResponseWithPasswordDTO {
  id: string
  firstName: string
  lastName: string
  username: string
  emailAddress: string
  birthDate: string
  password: string
  middleName: string | null
  photo: string | null

  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.middleName = model.middleName
    this.username = model.username
    this.emailAddress = model.emailAddress
    this.birthDate = model.birthDate
    this.photo = model.photo
    this.password = model.password
  }

  static of(model: UserEntity): UserResponseWithPasswordDTO
  static of(model: UserEntity[]): UserResponseWithPasswordDTO[]

  static of(model: UserEntity | UserEntity[]): UserResponseWithPasswordDTO | UserResponseWithPasswordDTO[] {
    return model instanceof Array
      ? model.map(it => new UserResponseWithPasswordDTO(it))
      : new UserResponseWithPasswordDTO(model)
  }
}