import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common'
import {EntityManager, Transaction, TransactionManager} from 'typeorm'
import {httpExceptionMessage} from '../../consts/http-exception-message'
import {CreateUserRequestDTO, UpdateUserRequestDTO} from '../../domains/user/dtos/user.mutation.dto'
import {hashPassword} from '../../utils/password.util'
import {UserEntity} from './user.entity'
import {UserRepository} from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
  ) {
  }

  private async throwExceptionIfEmailInUse(emailAddress: string): Promise<void> {
    const foundUserByEmail = await this.repository.findOneByEmail(emailAddress)
    if (foundUserByEmail) {
      throw new ForbiddenException(httpExceptionMessage.user.emailAlreadyInUse)
    }
  }

  private async throwExceptionIfUsernameInUse(username: string): Promise<void> {
    const foundUserByUsername = await this.repository.findOneByUsername(username)
    if (foundUserByUsername) {
      throw new ForbiddenException(httpExceptionMessage.user.usernameAlreadyInUse)
    }
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.repository.findOneById(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  @Transaction()
  async createOne(dto: CreateUserRequestDTO,
                  @TransactionManager() entityManager?: EntityManager): Promise<UserEntity> {
    const { password, ...user } = dto
    if (dto.password !== dto.passwordConfirmation) {
      throw new ForbiddenException(httpExceptionMessage.user.passwordsDoNotMatch)
    }
    await this.throwExceptionIfEmailInUse(dto.emailAddress)
    await this.throwExceptionIfUsernameInUse(dto.username)

    const hashedPassword = await hashPassword(password)
    const newUser = await this.repository.createOrUpdateOne({
      password: hashedPassword,
      ...user,
    }, entityManager)
    return UserEntity.of(newUser)
  }

  async updateOne(dto: UpdateUserRequestDTO): Promise<UserEntity> {
    if (dto.emailAddress) {
      await this.throwExceptionIfEmailInUse(dto.emailAddress)
    }
    if (dto.username) {
      await this.throwExceptionIfUsernameInUse(dto.username)
    }

    const newUser = await this.repository.createOrUpdateOne(dto)
    return UserEntity.of(newUser)
  }

  async removeOne(id: string): Promise<void> {
    const user = { id, isDeleted: true }
    await this.repository.createOrUpdateOne(user)
  }

  async findOneByEmailOrUsernameWithPassword(emailOrUsername: string): Promise<UserEntity | undefined> {
    return await this.repository.findOneByEmailOrUsernameWithPassword(emailOrUsername)
  }
}
