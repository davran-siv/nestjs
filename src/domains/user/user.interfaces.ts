import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { UserEntity } from '../../persistence/user/user.entity'

export class CreateUserRequestDTO {
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
  @ApiProperty()
  readonly birthDate: string
  @ApiPropertyOptional()
  readonly middleName?: string
  @ApiPropertyOptional()
  readonly photo?: string
}

export class UpdateUserRequestDTO {
  @ApiProperty()
  readonly id: string
  @ApiPropertyOptional()
  readonly firstName?: string
  @ApiPropertyOptional()
  readonly lastName?: string
  @ApiPropertyOptional()
  readonly middleName?: string
  @ApiPropertyOptional()
  readonly username?: string
  @ApiPropertyOptional()
  readonly emailAddress?: string
  @ApiPropertyOptional()
  readonly birthDate?: string
  @ApiPropertyOptional()
  readonly photo?: string
}

export class UserResponseDTO {
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
  @ApiProperty()
  readonly birthDate: string
  @ApiProperty()
  readonly middleName: string | null
  @ApiProperty()
  readonly photo: string | null

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

export class UserResponseWithPasswordDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  firstName: string
  @ApiProperty()
  lastName: string
  @ApiProperty()
  username: string
  @ApiProperty()
  emailAddress: string
  @ApiProperty()
  birthDate: string
  @ApiProperty()
  password: string
  @ApiProperty()
  middleName: string | null
  @ApiProperty()
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

  static of(model: UserEntity): UserResponseWithPasswordDto
  static of(model: UserEntity[]): UserResponseWithPasswordDto[]

  static of(model: UserEntity | UserEntity[]): UserResponseWithPasswordDto | UserResponseWithPasswordDto[] {
    return model instanceof Array
      ? model.map(it => new UserResponseWithPasswordDto(it))
      : new UserResponseWithPasswordDto(model)
  }
}
