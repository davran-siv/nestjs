import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, EntityManager, Repository } from 'typeorm'
import { CartItemEntity } from './cart-item.entity'
import { CartItemDeleteDto, CartItemUpdateDto } from './cart-item.interfaces'

export class CartItemRepository {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly entity: Repository<CartItemEntity>
  ) {
  }

  findOneById(id: string): Promise<CartItemEntity | undefined> {
    return this.entity.createQueryBuilder('cartItem')
               .where('cartItem.id = :id', { id })
               .getOne()
  }

  createOrUpdateOne(entityLike: DeepPartial<CartItemEntity>, entityManager?: EntityManager): Promise<CartItemEntity> {
    const entity = this.entity.create(entityLike)
    return entityManager ? entityManager.save(entity) : this.entity.save(entity)
  }

  async updateOneByIdAndCartId(dto: CartItemUpdateDto, entityManager?: EntityManager): Promise<void> {
    await this.entity.createQueryBuilder('cartItem')
              .leftJoin('cartItem.cart', 'cart')
              .update(CartItemEntity)
              .set({
                amount: dto.amount,
                updatedAt: new Date()
              })
              .where('id = :id', { id: dto.id })
              .andWhere('cart.id = :cartId', { cartId: dto.cartId })
              .execute()
  }

  async deleteOneByIdAndCartId(dto: CartItemDeleteDto): Promise<void> {
    await this.entity.createQueryBuilder('cartItem')
              .leftJoin('cartItem.cart', 'cart')
              .delete()
              .from(CartItemEntity)
              .where('id = :id', { id: dto.id })
              .andWhere('cart.id = :cartId', { cartId: dto.cartId })
              .execute()
  }

}