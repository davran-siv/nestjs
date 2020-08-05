import {DeepPartial, EntityManager, EntityRepository, Repository} from 'typeorm'
import {UserEntity} from './user.entity'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createOrUpdateOne(entityLike: DeepPartial<UserEntity>, entityManager?: EntityManager): Promise<UserEntity> {
    const entity = this.create(entityLike)
    return entityManager ? entityManager.save(entity) : this.save(entity)
  }

  findOneById(id: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('user')
               .where('user.id = :id', { id })
               .getOne()
  }

  findOneByEmail(emailAddress: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('users')
               .where('users.emailAddress = :emailAddress', { emailAddress })
               .getOne()
  }

  findOneByUsername(username: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('users')
               .where('users.emailAddress = :username', { username })
               .getOne()
  }

  findOneByEmailOrUsernameWithPassword(emailAddressOrUsername: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('users')
               .where('users.emailAddress = :emailAddressOrUsername', { emailAddressOrUsername })
               .orWhere('users.username = :emailAddressOrUsername', { emailAddressOrUsername })
               .addSelect('users.password')
               .getOne()
  }
}
