import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import { CartEntity } from './cart.entity'

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly entity: Repository<CartEntity>
  ) {
  }

  createOne(userId: string, entityManager?: EntityManager): Promise<CartEntity> {
    const toCreate = { user: { id: userId } }
    const entity = this.entity.create(toCreate)
    return entityManager ? entityManager.save(entity) : this.entity.save(entity)
  }

  findOneByUserId(userId: string): Promise<CartEntity> {
    return this.entity.createQueryBuilder('cart')
               // .where('user.id = :userId', { userId })
               .leftJoin('cart.user', 'user')
               .leftJoinAndSelect('cart.items', 'items')
               .getOne()
  }
}