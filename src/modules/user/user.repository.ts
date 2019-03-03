import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { UserEntity } from './user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>
  ) {

  }

  async createOrUpdateOne(entityLike: DeepPartial<UserEntity>): Promise<UserEntity> {
    const entity = this.userEntity.create(entityLike)
    return this.userEntity.save(entity)
  }

  findOneById(id: string): Promise<UserEntity> {
    return this.userEntity.createQueryBuilder('users')
               .where('users.id = :id', { id })
               .getOne()
  }

  findOneByEmail(emailAddress: string): Promise<UserEntity> {
    return this.userEntity.createQueryBuilder('users')
               .where('users.emailAddress = :emailAddress', { emailAddress })
               .getOne()
  }

  findOneByUsername(username: string): Promise<UserEntity> {
    return this.userEntity.createQueryBuilder('users')
               .where('users.emailAddress = :username', { username })
               .getOne()
  }

  findOneByEmailOrUsernameWithPassword(emailAddressOrUsername: string): Promise<UserEntity> {
    return this.userEntity.createQueryBuilder('users')
               .where('users.emailAddress = :emailAddressOrUsername', { emailAddressOrUsername })
               .orWhere('users.username = :emailAddressOrUsername', { emailAddressOrUsername })
               .andWhere('users.isDeleted = false')
               .addSelect('users.password')
               .getOne()
  }
}
