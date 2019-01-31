import { UserEntity } from './user.entity'

export class CreateUserRequestDTO {
  readonly id: string
  readonly firstName: string
  readonly lastName: string
  readonly middleName: string
  readonly username: string
  readonly password: string
  readonly isDeleted: boolean
  readonly isActive: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly emailAddress: string
  readonly isEmailVerified: boolean
  readonly birthDate: string
}

export class UserResponseDTO {
  id: string
  firstName: string
  lastName: string
  middleName: string
  username: string
  emailAddress: string
  birthDate: string

  constructor(model: UserEntity) {
    this.id = model.id
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.middleName = model.middleName
    this.username = model.username
    this.emailAddress = model.emailAddress
    this.birthDate = model.birthDate
  }

  static of(model: UserEntity): UserResponseDTO
  static of(model: UserEntity[]): UserResponseDTO[]

  static of(model: UserEntity | UserEntity[]): UserResponseDTO | UserResponseDTO[] {
    return model instanceof Array ? model.map(it => new UserResponseDTO(it)) : new UserResponseDTO(model)
  }
}