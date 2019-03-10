import { ApiModelProperty } from '@nestjs/swagger'
import { UserLocationCreateDto, UserLocationResponseDto } from '../user-location/user-location.interfaces'
import { UserEntity } from './user.entity'

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
  @ApiModelProperty({ required: false })
  readonly middleName?: string
  @ApiModelProperty({ required: false })
  readonly photo?: string
  @ApiModelProperty()
  readonly location: UserLocationCreateDto
}

export class UpdateUserRequestDTO {
  @ApiModelProperty()
  readonly id: string
  @ApiModelProperty({ required: false })
  readonly firstName?: string
  @ApiModelProperty({ required: false })
  readonly lastName?: string
  @ApiModelProperty({ required: false })
  readonly middleName?: string
  @ApiModelProperty({ required: false })
  readonly username?: string
  @ApiModelProperty({ required: false })
  readonly emailAddress?: string
  @ApiModelProperty({ required: false })
  readonly birthDate?: string
  @ApiModelProperty({ required: false })
  readonly photo?: string
  @ApiModelProperty({ required: false })
  readonly location?: UserLocationCreateDto
}

export class UserResponseDTO {
  @ApiModelProperty()
  readonly id: string
  @ApiModelProperty()
  readonly firstName: string
  @ApiModelProperty()
  readonly lastName: string
  @ApiModelProperty()
  readonly username: string
  @ApiModelProperty()
  readonly emailAddress: string
  @ApiModelProperty()
  readonly birthDate: string
  @ApiModelProperty()
  readonly middleName: string | null
  @ApiModelProperty()
  readonly photo: string | null
  @ApiModelProperty()
  location: UserLocationResponseDto | null


  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.middleName = model.middleName
    this.username = model.username
    this.emailAddress = model.emailAddress
    this.birthDate = model.birthDate
    this.photo = model.photo
    this.location = model.location ? UserLocationResponseDto.of(model.location) : null
  }

  static of(model: UserEntity): UserResponseDTO
  static of(model: UserEntity[]): UserResponseDTO[]

  static of(model: UserEntity | UserEntity[]): UserResponseDTO | UserResponseDTO[] {
    return model instanceof Array ? model.map(it => new UserResponseDTO(it)) : new UserResponseDTO(model)
  }
}

export class UserResponseWithPasswordDto {
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
  password: string
  @ApiModelProperty()
  middleName: string | null
  @ApiModelProperty()
  photo: string | null
  @ApiModelProperty()
  readonly location: UserLocationResponseDto | null

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
    this.location = model.location ? UserLocationResponseDto.of(model.location) : null
  }

  static of(model: UserEntity): UserResponseWithPasswordDto
  static of(model: UserEntity[]): UserResponseWithPasswordDto[]

  static of(model: UserEntity | UserEntity[]): UserResponseWithPasswordDto | UserResponseWithPasswordDto[] {
    return model instanceof Array
      ? model.map(it => new UserResponseWithPasswordDto(it))
      : new UserResponseWithPasswordDto(model)
  }
}