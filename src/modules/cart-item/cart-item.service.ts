import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { HttpExceptionMessage } from '../../consts/http-exception-message'
import { CartItemCreateDto, CartItemDeleteDto, CartItemResponseDto, CartItemUpdateDto } from './cart-item.interfaces'
import { CartItemRepository } from './cart-item.repository'

@Injectable()
export class CartItemService {
  constructor(
    private readonly repository: CartItemRepository
  ) {
  }

  async createOne(dto: CartItemCreateDto, entityManager?: EntityManager): Promise<CartItemResponseDto> {
    const { cartId, productId, ...rest } = dto
    const entityLike = { ...rest, product: { id: productId }, cart: { id: cartId } }
    const cartItem = await this.repository.createOrUpdateOne(entityLike, entityManager)
    const foundCartItem = await this.repository.findOneById(cartItem.id)
    if (!foundCartItem) {
      throw new UnprocessableEntityException()
    }
    return foundCartItem
  }

  async updateOneByIdAndCartId(dto: CartItemUpdateDto, entityManager?: EntityManager): Promise<CartItemResponseDto> {
    const cartItem = await this.repository.findOneById(dto.id)
    if (!cartItem) {
      throw new NotFoundException(HttpExceptionMessage.cart.cartItemNotFound)
    }
    const { cartId, ...rest } = dto
    const entityLike = { ...rest, cart: { id: cartId } }
    await this.repository.createOrUpdateOne(entityLike, entityManager)
    return {
      ...cartItem,
      ...rest
    }
  }

  async deleteOneByIdAndCartId(dto: CartItemDeleteDto): Promise<void> {
    return this.repository.deleteOneByIdAndCartId(dto)
  }


}
