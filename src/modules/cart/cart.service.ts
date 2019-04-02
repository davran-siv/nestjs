import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { HttpExceptionMessage } from '../../consts/http-exception-message'
import { CartItemService } from '../cart-item/cart-item.service'
import { AddItemToCartDto, CartResponseDto, CartUpdateCartItemAmountDto } from './cart.interfaces'
import { CartRepository } from './cart.repository'

@Injectable()
export class CartService {
  constructor(
    private readonly repository: CartRepository,
    private readonly cartItemService: CartItemService
  ) {
  }

  createOne(userId: string, entityManager?: EntityManager): Promise<CartResponseDto> {
    return this.repository.createOne(userId, entityManager)
  }

  async findOneByUserId(userId: string): Promise<CartResponseDto> {
    const cart = await this.repository.findOneByUserId(userId)
    if (!cart) {
      throw new NotFoundException(HttpExceptionMessage.cart.notFound)
    }
    return cart
  }

  async addToItemToCartByUserId(dto: AddItemToCartDto, userId: string): Promise<CartResponseDto> {
    const { id, items } = await this.findOneByUserId(userId)
    const newCartItem = await this.cartItemService.createOne({
      cartId: id,
      ...dto
    })
    return {
      id,
      items: [...items, newCartItem]
    }
  }

  async updateItemInCartByCartItemId(dto: CartUpdateCartItemAmountDto, userId: string): Promise<CartResponseDto> {
    const { id, items } = await this.findOneByUserId(userId)
    const updatedCartItem = await this.cartItemService.updateOneByIdAndCartId({
      cartId: id,
      id: dto.cartItemId,
      ...dto
    })
    return {
      id,
      items: [...items.filter(it => it.id !== dto.cartItemId), updatedCartItem]
    }
  }

  async deleteOneByIdAndCartId(cartItemId: string, userId: string): Promise<CartResponseDto> {
    const { id, items } = await this.findOneByUserId(userId)
    await this.cartItemService.deleteOneByIdAndCartId({
      id: cartItemId,
      cartId: id
    })
    return {
      id,
      items: [...items.filter(it => it.id !== cartItemId)]
    }
  }

}
