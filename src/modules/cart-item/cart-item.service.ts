import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { CartItemCreateDto, CartItemDeleteDto, CartItemUpdateDto } from './cart-item.interfaces'
import { CartItemRepository } from './cart-item.repository'

@Injectable()
export class CartItemService {
  constructor(
    private readonly repository: CartItemRepository
  ) {
  }

  async createOne(dto: CartItemCreateDto, entityManager?: EntityManager): Promise<any> {
    const { cartId, productId, ...rest } = dto
    const entityLike = { ...rest, product: { id: productId }, cart: { id: cartId } }
    const cartItem = await this.repository.createOrUpdateOne(entityLike, entityManager)
    return this.repository.findOneById(cartItem.id)
  }

  async updateOneByIdAndCartId(dto: CartItemUpdateDto, entityManager?: EntityManager): Promise<any> {
    const { cartId, ...rest } = dto
    const entityLike = { ...rest, cart: { id: cartId } }
    await this.repository.createOrUpdateOne(entityLike, entityManager)
    return this.repository.findOneById(dto.id)
  }

  async deleteOneByIdAndCartId(dto: CartItemDeleteDto): Promise<void>{
    return this.repository.deleteOneByIdAndCartId(dto)
  }


}
