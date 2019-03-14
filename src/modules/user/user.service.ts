import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { HttpExceptionMessage } from '../../consts/http-exception-message'
import { hashPassword } from '../../utils/password.util'
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserResponseDTO,
  UserResponseWithPasswordDto
} from './user.interfaces'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
  ) {
  }

  private async throwExceptionIfEmailInUse(emailAddress: string): Promise<void> {
    const foundUserByEmail = await this.repository.findOneByEmail(emailAddress)
    if (foundUserByEmail) {
      throw new ForbiddenException(HttpExceptionMessage.user.emailAlreadyInUse)
    }
  }

  private async throwExceptionIfUsernameInUse(username: string): Promise<void> {
    const foundUserByUsername = await this.repository.findOneByUsername(username)
    if (foundUserByUsername) {
      throw new ForbiddenException(HttpExceptionMessage.user.usernameAlreadyInUse)
    }
  }

  async findOneById(id: string): Promise<UserResponseDTO> {
    const user = await this.repository.findOneById(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
    // return UserResponseDTO.of(user)
  }

  @Transaction()
  async createOne(dto: CreateUserRequestDTO,
                  @TransactionManager() entityManager?: EntityManager): Promise<UserResponseDTO> {
    const { password, ...user } = dto
    if (dto.password !== dto.passwordConfirmation) {
      throw new ForbiddenException(HttpExceptionMessage.user.passwordsDoNotMatch)
    }
    await this.throwExceptionIfEmailInUse(dto.emailAddress)
    await this.throwExceptionIfUsernameInUse(dto.username)

    const hashedPassword = await hashPassword(password)
    const newUser = await this.repository.createOrUpdateOne({
      password: hashedPassword,
      ...user
    }, entityManager)
    return UserResponseDTO.of(newUser)
  }

  async updateOne(dto: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    if (dto.emailAddress) {
      await this.throwExceptionIfEmailInUse(dto.emailAddress)
    }
    if (dto.username) {
      await this.throwExceptionIfUsernameInUse(dto.username)
    }

    const newUser = await this.repository.createOrUpdateOne(dto)
    return UserResponseDTO.of(newUser)
  }

  async removeOne(id: string): Promise<void> {
    const user = { id, isDeleted: true }
    await this.repository.createOrUpdateOne(user)
  }

  async findOneByEmailOrUsernameWithPassword(emailOrUsername: string): Promise<UserResponseWithPasswordDto | undefined> {
    const user = await this.repository.findOneByEmailOrUsernameWithPassword(emailOrUsername)
    return user ? UserResponseWithPasswordDto.of(user) : user
  }
}