import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, EntityManager, Repository } from 'typeorm'
import { UserEntity } from './user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly entity: Repository<UserEntity>
  ) {

  }

  async createOrUpdateOne(entityLike: DeepPartial<UserEntity>, entityManager?: EntityManager): Promise<UserEntity> {
    const entity = this.entity.create(entityLike)
    return entityManager ? entityManager.save(entity) : this.entity.save(entity)
  }

  findOneById(id: string): Promise<UserEntity> {
    return this.entity.createQueryBuilder('user')
               .leftJoinAndSelect('user.products', 'products')
               .leftJoinAndSelect('user.favoriteProducts', 'favoriteProducts')
               .select(['user', 'products.id', 'favoriteProducts.id'])
               .where('user.id = :id', { id })
               .getOne()
  }

  findOneByEmail(emailAddress: string): Promise<UserEntity> {
    return this.entity.createQueryBuilder('users')
               .where('users.emailAddress = :emailAddress', { emailAddress })
               .getOne()
  }

  findOneByUsername(username: string): Promise<UserEntity> {
    return this.entity.createQueryBuilder('users')
               .where('users.emailAddress = :username', { username })
               .getOne()
  }

  findOneByEmailOrUsernameWithPassword(emailAddressOrUsername: string): Promise<UserEntity> {
    return this.entity.createQueryBuilder('users')
               .where('users.emailAddress = :emailAddressOrUsername', { emailAddressOrUsername })
               .orWhere('users.username = :emailAddressOrUsername', { emailAddressOrUsername })
               .andWhere('users.isDeleted = false')
               .addSelect('users.password')
               .getOne()
  }
}
