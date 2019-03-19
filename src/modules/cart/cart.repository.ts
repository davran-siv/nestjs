import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import { AddItemToCartDto } from './cart.interfaces'
import { CartEntity } from './entities/cart.entity'

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
               .where('user.id = :userId', { userId })
               .leftJoin('cart.user', 'user')
               .leftJoinAndSelect('cart.items', 'items')
               .getOne()
  }

  addItemToCartByUserId(dto: AddItemToCartDto, userId: string, entityManager?: EntityManager): Promise<void> {
    const queryBuilder = entityManager ? entityManager.createQueryBuilder() : this.entity.createQueryBuilder('cart')
    return queryBuilder.relation(CartEntity, 'categories')
                       .of(1)
                       .add(3)
  }
}