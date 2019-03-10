import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, EntityManager, Repository } from 'typeorm'
import { UserLocationEntity } from './user-location.entity'

@Injectable()
export class UserLocationRepository {
  constructor(
    @InjectRepository(UserLocationEntity)
    private readonly entity: Repository<UserLocationEntity>
  ) {
  }

  createOrUpdateOne(entityLike: DeepPartial<UserLocationEntity>,
                    userId: string,
                    entityManager?: EntityManager): Promise<UserLocationEntity> {
    entityLike.user = { id: userId }
    const entity = this.entity.create(entityLike)
    return entityManager ? entityManager.save(entity) : this.entity.save(entity)
  }
}